import React, {FC, useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {IUserData} from '../Types';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../thunks/index';
import {RootState} from '../store/store';

const SignUp:React.FC = () => {

  const [userData,setUserData] = useState<IUserData>({
    login: '',
    password: '',
  } as IUserData);


  const dispatch = useDispatch();
  const isReg = useSelector((state: RootState) => state.AuthReducer.isRegister);
  const error = useSelector((state: RootState) => state.AuthReducer.error);

  const handleSubmit = () => {
    const payload = {
      login:userData.login,
      password:userData.password
    };
    return dispatch(register(payload));
  };

  return isReg ? (
    <Navigate to="/login" />
  ) : (
    <>
      Регистрация
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="login"
          name="login"
          rules={[{ required: true, message: 'Please input your login!' }]}
        >
          <Input
            value={userData.login}
            onChange={(e) => setUserData({...userData, login: e.target.value})}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={userData.password}
            onChange={(e) => setUserData({...userData,password: e.target.value})}/>
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>{error && <p>{error}</p>}</p>
      <p>
        У вас уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </>
  );
};

export default SignUp;