import React from 'react';
import SignIn from '../components/SignIn';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <>
      <SignIn/>
      <p>Нет аккаунта?<Link to="/registration">Зарегистрируйтесь</Link></p>
    </>
  );
};

export default Login;