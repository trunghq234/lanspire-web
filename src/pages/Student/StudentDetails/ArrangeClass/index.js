import React, { useState, useEffect, useRef } from 'react';
import { PrinterOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Table,
  Card,
  Input,
  Divider,
  Button,
  message,
  notification,
  Modal,
  Popconfirm,
} from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getClasses } from 'redux/actions/classes';
import { getCourses } from 'redux/actions/courses';
import { classState$, courseState$, studentState$, userState$ } from 'redux/selectors';
import { currentDate, isConflictTimetable } from 'utils/dateTime';
import { convertCommasToNumber, numberWithCommas } from 'utils/stringHelper';
import Invoice from 'components/Student/Invoice';
import styles from './index.module.less';
import studentApi from 'api/studentApi';
import { updateStudents } from 'redux/actions/students';
const { Search } = Input;

const ArrangeClass = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [dataSource, setDataSource] = useState();
  const [filters, setFilters] = useState();
  const classes = useSelector(classState$);
  const students = useSelector(studentState$);
  const courses = useSelector(courseState$);
  const user = useSelector(userState$);
  const [total, setTotal] = useState(0);
  const [fullName, setFullName] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [isPayment, setIsPayment] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [dataSearch, setDataSearch] = useState([]); //Data sau khi search
  const [visiblePopConfirm, setVisiblePopConfirm] = useState(false);
  const [student, setStudent] = useState();
  const dispatch = useDispatch();
  const { idStudent } = useParams();
  const history = useHistory();
  const invoiceRef = useRef();
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
          !keyClassesRegistered.includes(curr.idClass) &&
          !isConflictTimetable(curr.ClassTimes, currentTimetable)
        ) {
          pre.push({
            key: curr.idClass,
            className: curr.className,
            course: curr.Course.courseName,
            startDate: moment(curr.startDate).format('DD/MM/YYYY'),
            endDate: moment(curr.endDate).format('DD/MM/YYYY'),
            fee: numberWithCommas(curr.Course.fee),
          });
        }
        return pre;
      }, []);
      setDataSource(classList);
      setDataSearch(classList);
    }
  }, [student]);

  //set info student
  useEffect(() => {
    if (student) {
      setFullName(student.User.displayName);
      setGender(
        student.User.gender === 1 ? 'Male' : student.User.gender === 0 ? 'Female' : 'Others'
      );
      setPhoneNumber(student.User.phoneNumber);
      setAddress(
        `${student.User.address[0]}, ${student.User.address[1]}, ${student.User.address[2]}`
      );
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
    }
  }, [students.isLoading]);

  //Search class
  const handleSearch = value => {
    const dataTmp = dataSource.filter(
      item => item.className.toLowerCase().search(value.toLowerCase()) >= 0
    );
    setDataSearch(dataTmp);
  };

  //print
  const printInvoice = useReactToPrint({
    content: () => invoiceRef.current,
  });
  //handle payment
  const handlePayment = () => {
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
      dispatch(updateStudents.updateStudentsRequest(studentUpdate));
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
          <Receipt itemName="Created date" value={currentDate} />
          <Divider className={styles.divider} />
          <h4>Student info</h4>
          <Receipt itemName="Full name" value={fullName} />
          <Receipt itemName="Gender" value={gender} />
          <Receipt itemName="Phone" value={phoneNumber} />
          <Receipt itemName="Address" value={address} />
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
                  <h3 className={styles.total}>{numberWithCommas(total)}</h3>
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
              setVisibleModal(true);
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
      <Modal
        visible={visibleModal}
        width="1000px"
        okText="Print"
        closable={false}
        centered={true}
        onCancel={() => {
          setVisibleModal(false);
          history.push(`/student/details/${idStudent}`);
        }}
        onOk={printInvoice}
        okButtonProps={{
          icon: <PrinterOutlined />,
          style: { width: '150px', marginRight: '20px' },
        }}>
        <Invoice
          ref={invoiceRef}
          dataSource={selectedClasses}
          totalFee={total}
          fullName={fullName}
          phoneNumber={phoneNumber}
          address={address}
          creator={user.displayName}
        />
      </Modal>
    </Row>
  );
};

export default ArrangeClass;
