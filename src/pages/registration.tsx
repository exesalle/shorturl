import React from 'react';
import SignUp from '../components/SignUp';
import {Link} from 'react-router-dom';

const Registration = () => {
  return (
    <><div className="App">
      <SignUp/>
      <p>
        У вас уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
    </>
  );
};

export default Registration;