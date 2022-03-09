import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Table, Input} from 'antd';
import {useNavigate} from "react-router-dom";

const Employees = ({employeesData}) => {
  const [data, setData] = useState(employeesData);
  const navigate = useNavigate();
  const {Column} = Table;
  const searchById = (event) => {
    const searchVal = event.target.value;
    if (searchVal != '') {
      const filteredData = employeesData.filter(
          (obj) => obj.id == event.target.value,
      );
      setData(filteredData);
    } else {
      setData(employeesData);
    }
  };
  return (
    <div>
      <Input placeholder="Search By Id" onChange={searchById}
        className="searchbox"/>
      <Table
        dataSource={data}
        pagination={{pageSize: 5}}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate('/'+record.id);
            },
          };
        }}>
        <Column
          title="Id"
          dataIndex="id"
          key="id"
          sorter={(a, b) => a.id - b.id}
          className="table-cols"
        />
        <Column
          title="Employee Name"
          dataIndex="employee_name"
          key="employee_name"
          className="table-cols"
        />
      </Table>
    </div>
  );
};

Employees.propTypes = {
  employeesData: PropTypes.array,
};
export default Employees;
