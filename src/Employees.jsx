import React, {useState, useEffect} from 'react';
import EmployeeTable from './Components/EmployeeTable';
import EmployeeForm from './Components/EmployeeForm';
import {Row, Col} from 'antd';
import Toast from './Components/Toast';
// import data from './data.json';

const Employees = () => {
  const [employeesData, setEmployeeData] = useState();
  const [visible, setVisible] = useState(false);
  const [toaster, setToaster] = useState(false);
  useEffect(() => {
    setToaster('Loading...');
    fetch("http://dummy.restapiexample.com/api/v1/employees")
        .then((res) => res.json())
        .then((data) => {
          setEmployeeData(data.data);
          setToaster(false);
        }).catch((err) => {
          setToaster(`Something went wrong from server side! 
          Please refresh after sometime.`);
          setTimeout(function() {
            setToaster(false);
          }, 3000);
        });
  }, []);

  return (
    <div>
      <Toast message={toaster}/>
      <Row>
        <Col span="24">
          <h1 className='page-title'>
            Employee Address Book
          </h1>
          <div className='add-new-btn'>
            <h4 onClick={() => setVisible(true)}>
                Add New Employee
            </h4>
          </div>
        </Col>
      </Row>
      <div className='table-section'>
        <Row>
          <Col offset="12" span="6" className='employee-table-col'>
            {employeesData && <EmployeeTable employeesData={employeesData}/>}
            {!employeesData && 'No Data'}
          </Col>
        </Row>
      </div>
      {visible && <div
        className='add-modal'
      >
        <div className='add-modal-content'>
          <EmployeeForm
            setVisibleFalse={() => setVisible(false)}
          />
        </div>
      </div>}
    </div>
  );
};

export default Employees;
