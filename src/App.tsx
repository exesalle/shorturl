import React from 'react';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Registration from './pages/registration';
import {Route, Routes} from 'react-router-dom';
import Profile from './pages/profile';
import ShortedLink from './components/ShortedLink';


function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<Home/>} />
          <Route path="registration" element={<Registration/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="profile/:id" element={<Profile/>}/>
          <Route path="/:id" element={<ShortedLink/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
