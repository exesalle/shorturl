import React, {FC, useEffect, useState} from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {IUserData} from '../Types';
import {Button, Form, Input} from 'antd';
import {getLinks, login, register} from '../thunks/index';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';



const SignIn:React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.AuthReducer.isAuth);
  const error = useSelector((state: RootState) => state.AuthReducer.error);
  const push = useNavigate();

  const links = useSelector((state: RootState) => state.Reducer.links);

  const [userData,setUserData] = useState<IUserData>({
    login: '',
    password: ''
  } as IUserData);

  const handleLogin = () => {
    const payload = {
      login:userData.login,
      password:userData.password
    };
    return dispatch(login(payload));
  };

  useEffect(() => {
    return () => {
      console.log(links);
      dispatch(getLinks());
    };
  }, []);

  return isAuth ? (
    <Navigate to="/profile"/>
  ) : (
    <>Вход

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
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
            onChange={(e) => setUserData({...userData, password: e.target.value})}/>
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>{error && <p>{error}</p>}</p>
      <p>Нет аккаунта?<Link to="/registration">Зарегистрируйтесь</Link></p>
    </>
  );
};

export default SignIn;