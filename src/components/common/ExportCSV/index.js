import React from 'react';
import { CSVLink } from 'react-csv';
import {
  mapToClass,
  mapToCourse,
  mapToEmployee,
  mapToLecturer,
  mapToStudent,
} from 'utils/dataExcel';

export default function ExportCSV({ data, headers, type }) {
  const [dataExcel, setDataExcel] = React.useState([]);

  React.useEffect(() => {
    mapping(data, type);
  }, [type, data]);

  const mapping = (data, type) => {
    switch (type) {
      case 'employee': {
        const mappingData = mapToEmployee(data);
        setDataExcel(mappingData);
        break;
      }
      case 'lecturer': {
        const mappingData = mapToLecturer(data);
        setDataExcel(mappingData);
        break;
      }
      case 'student': {
        const mappingData = mapToStudent(data);
        setDataExcel(mappingData);
        break;
      }
      case 'course': {
        const mappingData = mapToCourse(data);
        setDataExcel(mappingData);
        break;
      }
      case 'class': {
        const mappingData = mapToClass(data);
        setDataExcel(mappingData);
        break;
      }
      default:
        break;
    }
  };

  return (
    <CSVLink
      filename={`${type}s.csv`}
      data={dataExcel}
      headers={headers}
      className="btn btn-primary">
      Export to CSV
    </CSVLink>
  );
}
