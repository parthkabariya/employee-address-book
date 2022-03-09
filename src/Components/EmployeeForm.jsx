import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Row, Col, Form, Input, Button} from 'antd';
import Toast from './Toast';

const EmployeeForm = (props) => {
  const [toaster, setToaster] = useState(false);
  const onFinish = (values) => {
    setToaster('Loading...');
    if (props.id) {
      fetch("http://dummy.restapiexample.com/api/v1/update/"+props.id, {
        method: "PUT",
        body: JSON.stringify(values),
      })
          .then((res) => res.json())
          .then((data) => {
            setToaster(data.message);
            setTimeout(function() {
              setToaster(false);
              if (props.id) {
                props.setVisibleFalse();
              }
            }, 1000);
          }).catch((err) => {
            setToaster(`Something went wrong from server side! 
            Please try after sometime.`);
            setTimeout(function() {
              setToaster(false);
            }, 3000);
          });
    } else {
      fetch("http://dummy.restapiexample.com/api/v1/create", {
        method: "POST",
        body: values,
      }).then((res) => res.json())
          .then((data) => {
            setToaster(data.message);
            setTimeout(function() {
              setToaster(false);
              props.setVisibleFalse();
            }, 1000);
          }).catch((err) => {
            setToaster(`Something went wrong from server side! 
            Please try after sometime.`);
            setTimeout(function() {
              setToaster(false);
            }, 3000);
          });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Toast message={toaster}/>
      <Row>
        <Col span="24" className='formElement'>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            fields={props.employeeData}
          >
            <Form.Item
              label="Full Name"
              name="employee_name"
              rules={[
                {
                  required: true,
                  message: 'Please input full name!',
                },
                {
                  min: 3,
                  message: 'Minimum 3 characters required!',
                },
                {
                  max: 15,
                  message: 'Maximum 15 characters required!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Salary"
              name="employee_salary"
              rules={[
                {
                  required: true,
                  message: 'Please input salary!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Age"
              name="employee_age"
              rules={[
                {
                  required: true,
                  message: 'Please input age!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              {!props.id && <Button type="primary"
                onClick={props.setVisibleFalse}>
                Cancel
              </Button>}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

EmployeeForm.propTypes = {
  employeeData: PropTypes.array,
  id: PropTypes.string,
  setVisibleFalse: PropTypes.func,
};
export default EmployeeForm;
