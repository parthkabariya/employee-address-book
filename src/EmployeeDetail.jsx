import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Row, Col} from 'antd';
import EmployeeForm from './Components/EmployeeForm';
import Toast from './Components/Toast';

const EmployeeDetail = () => {
  const [employeeData, setEmployeeData] = useState();
  const [toaster, setToaster] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setToaster('Loading...');
    fetch("http://dummy.restapiexample.com/api/v1/employee/"+id)
        .then((res) => res.json())
        .then((data) => {
          const tempData = [
            {
              name: ['employee_name'],
              value: data.data.employee_name,
            },
            {
              name: ['employee_salary'],
              value: data.data.employee_salary,
            },
            {
              name: ['employee_age'],
              value: data.data.employee_age,
            },
          ];
          setEmployeeData(tempData);
          setToaster(false);
        }).catch((err) => {
          setToaster(`Something went wrong from server side! 
            Please refresh after sometime.`);
          setTimeout(function() {
            setToaster(false);
          }, 3000);
        });
    // const data = [
    //   {
    //     name: ['employee_name'],
    //     value: 'Tiger Nixon',
    //   },
    //   {
    //     name: ['employee_salary'],
    //     value: 320800,
    //   },
    //   {
    //     name: ['employee_age'],
    //     value: 61,
    //   },
    // ];

    // setEmployeeData(data);
  }, []);

  const deleteEmployee = () => {
    setToaster('Loading...');
    fetch("http://dummy.restapiexample.com/api/v1/delete/"+id, {
      method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
          setToaster(data.message);
          setTimeout(function() {
            setToaster(false);
            navigate('/');
          }, 1000);
        }).catch((err) => {
          setToaster(`Something went wrong from server side! 
              Please refresh after sometime.`);
          setTimeout(function() {
            setToaster(false);
          }, 3000);
        });
  };
  return (
    <div>
      <Toast message={toaster}/>
      <Row>
        <Col span="24">
          <h1 className='page-title'>
            Employee Detail
          </h1>
        </Col>
      </Row>
      <EmployeeForm
        employeeData={employeeData}
        id={id}
      />
      <Row>
        <Col span="24" className='flex-parent'>
          <div className='add-new-btn'>
            <h4 onClick={() => navigate('/')}>
                Go Back
            </h4>
          </div>
          <div className='add-new-btn' onClick={() => deleteEmployee()}>
            <h4>
                Delete Employee
            </h4>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeDetail;
