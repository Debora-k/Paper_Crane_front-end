import { Container } from '@mui/material';
import { Button, Col, Form, Input, Row } from 'antd';
import Header from 'components/Header/Header';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';

import Logo from '../../assets/logo.png';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (request) => {
    axios
      .post("http://localhost:8080/api/v1/login/authenticate", {
        email: request.email,
        password: request.password,
      })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.data && response.data.id && response.data.email && response.data.role && response.data.token) {

            const { id, email, role, token } = response.data;

            sessionStorage.setItem('userId', id);
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userRole', role);
            sessionStorage.setItem('userToken', token);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            var url = `/${role.toLowerCase()}/projects`;
            var cId;
            if (role.toLowerCase() === 'client') {
                axios
                  // /dashboards does not exist yet on back-end
                  .get('http://localhost:8080/api/v1/dashboards', {
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
                    },
                  })
                  .then((results) => {
                    cId = sessionStorage.setItem('cId', results.data[0].cId);
                    if (cId != null) {
                      url = `/${role.toLowerCase()}/dashboard/${sessionStorage.getItem("cId")}`;
                      navigate(url);
                    }
                  })
                  .catch((error) => {
                    sessionStorage.setItem('cId', "1");
                    url = `/${role.toLowerCase()}/dashboard/${sessionStorage.getItem("cId")}`;
                    navigate(url);
                  });
            } else {
              navigate(url);
            }
          }
        }
      })
      .catch(() => {
        alert("Invalid username or password!");
      });
  };
  return (
    <div>
      <Header />
      <Container maxWidth='md' style={{ height: 'calc(100vh - 80px)' }}>
        <Row
          style={{
            height: '100%',
          }}
        >
          <Col
            span={24 / 2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className='logo'>
              <img className='invertedLogo' src={Logo} alt='logo' width={'200px'} />
            </div>
          </Col>

          <Col
            span={24 / 2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                maxWidth: '400px',
                minWidth: '300px',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                }}
              >
                Log in
              </h1>
              <Form form={form} layout='vertical' onFinish={handleSubmit}>
                <Form.Item label='Email' style={{ marginBottom: '15px' }} name="email">
                  <Input type='email' />
                </Form.Item>
                <Form.Item label='Password' name="password">
                  <Input type='password' />
                </Form.Item>
                <Form.Item style={{ marginBottom: '15px' }}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Link to='/forgot-password'>Forgot password? </Link>
                    <Button type='primary' htmlType='submit'>
                      Login
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};



export default Login;