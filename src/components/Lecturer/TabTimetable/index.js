import { notification } from 'antd';
import lecturerApi from 'api/lecturerApi';
import studentApi from 'api/studentApi';
import Timetable from 'components/common/Timetable';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getClasses } from 'redux/actions/classes';
import { classState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';

const LecturerTimetable = React.forwardRef((props, ref) => {
  const { idLecturer } = useParams();
  const [lecturer, setLecturer] = useState();
  const [dataSource, setDataSource] = useState([[], [], [], [], [], [], []]);
  const classes = useSelector(classState$);
  const dispatch = useDispatch();

  //get lecturer by id
  useEffect(async () => {
    try {
      const res = await lecturerApi.getLecturerById(idLecturer);
      console.log(res);
      setLecturer(res);
    } catch (err) {
      notification.error({
        message: `${err}`,
      });
    }
  }, []);

  // get class
  useEffect(() => {
    dispatch(getClasses.getClassesRequest());
  }, []);

  //load timetable
  useEffect(() => {
    if (lecturer && classes.data.length > 0) {
      const keyClassesTeaching = lecturer.Classes.reduce((pre, curr) => {
        if (moment(curr.endDate) >= currentDate()) {
          pre.push(curr.idClass);
        }
        return pre;
      }, []);
      const timetable = classes.data.reduce((pre, curr) => {
        if (keyClassesTeaching.includes(curr.idClass)) {
          pre.push(
            ...curr.ClassTimes.map(element => {
              return {
                dayOfWeek: element.dayOfWeek,
                startingTime: element.TimeFrame.startingTime,
                endingTime: element.TimeFrame.endingTime,
                contentEvent: {
                  title: curr.className,
                  room: curr.room,
                  startDate: moment(curr.startDate).format('DD/MM/YY'),
                  endDate: moment(curr.endDate).format('DD/MM/YY'),
                },
              };
            })
          );
        }
        return pre;
      }, []);

      var tmp = [[], [], [], [], [], [], []];
      for (let i = 0; i < timetable.length; ++i) {
        let start = timetable[i].startingTime;
        let end = timetable[i].endingTime;
        start = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
        end = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
        tmp[timetable[i].dayOfWeek].push({
          start,
          end,
          content: timetable[i].contentEvent,
        });
      }
      setDataSource(tmp);
    }
  }, [lecturer, classes.data]);

  return (
    <div ref={ref}>
      <Timetable dataSource={dataSource} />
    </div>
  );
});

export default LecturerTimetable;
