import React, {FC, useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {IUserData} from '../Types';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const onFinish = (values: any) => {
  console.log('Success:', values);
};


 
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
const SignUp:FC = () => {

  const [userData,setUserData] = useState<IUserData>({
    name:'',
    email: '',
    password: '',
  } as IUserData);
  const [error,setError] = useState('');
  const push = useNavigate();
  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      await updateProfile(res.user,{
        displayName: userData.name
      });
      push('/profile'+userData.email);
    } catch (error:any){
      error.message && setError(error.message);
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
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}/>
        </Form.Item>
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
          <Button type="primary" htmlType="submit" onClick={handleRegister}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>{error && <p>{error}</p>}</p>
    </>
  );
};

export default SignUp;