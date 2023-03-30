import React, {FC, useState} from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {IUserData} from '../Types';
import {Button, Form, Input} from 'antd';


const onFinish = (values: any) => {
  console.log('Success:', values);
};



const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const SignIn:FC = () => {

  const [userData,setUserData] = useState<IUserData>({
    email: '',
    password: ''
  } as IUserData);


  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const push = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(userData.email, userData.password);
      push('/profile');
    } catch (error:any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}/>
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>{error && <p>{error.message}</p>}</p>
    </>
  );
};

export default SignIn;