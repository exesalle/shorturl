import React from 'react';
import {signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';


export const CurrentUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const push = useNavigate();

  const handleLogin = () => {
    push('/login');
  };
  const handleLogout = () => {
    signOut(auth);
    push('/login');
  };
  if (loading) {
    return (
      <div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Ошибка: {error.message}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div className="user-status">
        <p>Hello {user.displayName}</p>

        <button className="log-out" onClick={handleLogout}>Выйти</button>
      </div>
    );
  }
  return <button className="log-out" onClick={handleLogin}>Авторизация</button>;
};