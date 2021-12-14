import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  message,
  notification,
  Popconfirm,
  Row,
  Table,
} from 'antd';
import billApi from 'api/billApi';
import studentApi from 'api/studentApi';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getClasses } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import { updateStudents } from 'redux/actions/students';
import { billState$, classState$, courseState$, studentState$, userState$ } from 'redux/selectors';
import { currentDate, isConflictTimetable } from 'utils/dateTime';
import { convertCommasToNumber, parseThousand } from 'utils/stringHelper';
import styles from './index.module.less';
const { Search } = Input;

const ArrangeClass = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [dataSource, setDataSource] = useState();
  const [filters, setFilters] = useState();
  const classes = useSelector(classState$);
  const students = useSelector(studentState$);
  const courses = useSelector(courseState$);
  const bills = useSelector(billState$);
  const user = useSelector(userState$);
  const [total, setTotal] = useState(0);
  const [fullName, setFullName] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [isPayment, setIsPayment] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [dataSearch, setDataSearch] = useState([]); //Data sau khi search
  const [visiblePopConfirm, setVisiblePopConfirm] = useState(false);
  const [student, setStudent] = useState();
  const dispatch = useDispatch();
  const { idStudent } = useParams();
  const history = useHistory();
  const [idBill, setIdBill] = useState('');
  useEffect(() => {
    dispatch(getClasses.getClassesRequest());
    dispatch(getCourses.getCoursesRequest());
  }, []);

  //get student by id
  useEffect(async () => {
    try {
      const res = await studentApi.getById(idStudent);
      setStudent(res.data);
    } catch (err) {
      notification.error({
        message: `${err}`,
      });
    }
  }, []);
  //Custom data for dataSource of table
  useEffect(() => {
    //studying or register(key)
    if (student) {
      const keyClassesRegistered = student.Classes.reduce((pre, curr) => {
        if (moment(curr.endDate) >= currentDate()) {
          pre.push(curr.idClass);
        }
        return pre;
      }, []);
      //studying or register(class)
      const classTmp = classes.data.filter(element =>
        keyClassesRegistered.includes(element.idClass)
      );

      //studying or register(time)
      const currentTimetable = [];
      classTmp.forEach(element => {
        element.ClassTimes.forEach(item => {
          currentTimetable.push({
            dayOfWeek: item.dayOfWeek,
            startingTime: item.TimeFrame.startingTime,
            endingTime: item.TimeFrame.endingTime,
          });
        });
      });

      const classList = classes.data.reduce((pre, curr) => {
        if (
          moment(curr.startDate) >= currentDate() &&
          curr.Students.length < curr.Course.max &&
          !keyClassesRegistered.includes(curr.idClass) &&
          !isConflictTimetable(curr.ClassTimes, currentTimetable)
        ) {
          pre.push({
            key: curr.idClass,
            className: curr.className,
            course: curr.Course.courseName,
            startDate: moment(curr.startDate).format('DD-MM-YYYY'),
            endDate: moment(curr.endDate).format('DD-MM-YYYY'),
            fee: parseThousand(curr.Course.fee),
          });
        }
        return pre;
      }, []);
      setDataSource(classList);
      setDataSearch(classList);
    }
  }, [student, classes.data]);

  //set info student
  useEffect(() => {
    if (student) {
      setFullName(student.User.displayName);
      setGender(
        student.User.gender === 1 ? 'Male' : student.User.gender === 0 ? 'Female' : 'Others'
      );
      setPhoneNumber(student.User.phoneNumber);
      setAddress(student.User.address);
    }
  }, [student, classes.data]);

  //Custom data for filter course
  useEffect(() => {
    const tmp = courses.data.map(element => {
      return {
        text: element.courseName,
        value: element.courseName,
      };
    });
    setFilters(tmp);
  }, [courses.data]);

  const columns = [
    {
      title: 'Class name',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      align: 'center',
      filterSearch: true,
      filters: filters,
      onFilter: (value, record) => record.course === value,
    },
    {
      title: 'Start date',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
    },
    {
      title: 'End date',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
    },
  ];

  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (value, record) => {
      const totalFee = record.reduce((pre, curr) => {
        return pre + convertCommasToNumber(curr.fee);
      }, 0);
      setTotal(totalFee);
      setSelectedClasses(record);
      setSelectedRowKeys(value);
    },
  };

  //notification
  useEffect(() => {
    if (isPayment && students.isSuccess) {
      setVisiblePopConfirm(true);
    } else if (isPayment && !students.isSuccess && students.error.length > 0) {
      notification.error({
        message: students.error,
        style: {
          width: 300,
        },
      });
    } else if (isPayment && !bills.isSuccess && bills.error.length > 0) {
      notification.error({
        message: bills.error,
        style: {
          width: 300,
        },
      });
    }
  }, [students.isLoading, bills.isLoading]);

  //Search class
  const handleSearch = value => {
    const dataTmp = dataSource.filter(
      item => item.className.toLowerCase().search(value.toLowerCase()) >= 0
    );
    setDataSearch(dataTmp);
  };

  //handle payment
  const handlePayment = async () => {
    if (selectedClasses.length !== 0) {
      const idClasses = [...selectedRowKeys];
      student.Classes.forEach(element => {
        idClasses.push(element.idClass);
      });
      const studentUpdate = {
        ...student,
        idClasses,
      };
      setIsPayment(true);
      //bill & bill info
      const bill = {
        idUser: user.idUser,
        idStudent: student.idStudent,
        createdDate: currentDate().format('MM/DD/YYYY'),
        totalFee: total,
        BillInfos: selectedClasses.map(element => {
          return {
            idClass: element.key,
            fee: convertCommasToNumber(element.fee),
          };
        }),
      };
      const data = await billApi.create(bill);
      if (data) {
        setIdBill(data.idBill);
        dispatch(updateStudents.updateStudentsRequest(studentUpdate));
      }
    } else {
      message.warning('Please, select class for student!');
    }
  };
  //component receipt details
  const Receipt = ({ itemName, value }) => {
    return (
      <Row className={styles['item-receipt']}>
        <Col span={10}>
          <p className={styles['item-name']}>{itemName}</p>
        </Col>
        <Col span={14}>
          <p className={styles.value}>{value}</p>
        </Col>
      </Row>
    );
  };

  return (
    <Row gutter={20}>
      <Col span={16}>
        <Card>
          <Row>
            <Col span={10}>
              <Search
                className={styles['search-class']}
                placeholder="Enter class name ..."
                enterButton
                size="large"
                onSearch={handleSearch}
              />
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={dataSearch}
            rowSelection={rowSelection}
            loading={classes.isLoading}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <h3 className={styles['receipt-title']}>Payment</h3>
          <Divider />
          <h4>Receipt info</h4>
          <Receipt itemName="Created by" value={user.displayName} />
          <Receipt itemName="Created date" value={currentDate().format('DD/MM/YYYY')} />
          <Divider className={styles.divider} />
          <h4>Student info</h4>
          <Receipt itemName="Full name" value={fullName} />
          <Receipt itemName="Gender" value={gender} />
          <Receipt itemName="Phone" value={phoneNumber} />
          <Row className={styles['item-receipt']}>
            <Col span={10}>
              <p className={styles['item-name']}>Address</p>
            </Col>
            <Col span={14} className={styles['address-student']}>
              <p>{address ? address[0] : ''},</p>
              <p>{`${address ? address[1] : ''}, ${address ? address[2] : ''}`}</p>
            </Col>
          </Row>
          <Divider className={styles.divider} />
          <h4>Registered classes</h4>
          {selectedClasses.map(item => {
            return <Receipt itemName={item.className} value={item.fee} />;
          })}
          <Divider className={styles.divider} />
          <Row>
            <Col span={8}>
              <h3>Total</h3>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={20}>
                  <h3 className={styles.total}>{parseThousand(total)}</h3>
                </Col>
                <Col span={4}>
                  <h5 className={styles.unit}>VND</h5>
                </Col>
              </Row>
            </Col>
          </Row>
          <Popconfirm
            title="Payment successfully! Do you want to print invoice?"
            onCancel={() => history.push(`/student/details/${idStudent}`)}
            onConfirm={() => {
              setVisiblePopConfirm(false);
              history.push(`/invoice/${idBill}`);
            }}
            visible={visiblePopConfirm}>
            <Button
              className={styles['btn-payment']}
              type="primary"
              block
              onClick={handlePayment}
              loading={students.isLoading}>
              Pay
            </Button>
          </Popconfirm>
        </Card>
      </Col>
    </Row>
  );
};

export default ArrangeClass;
