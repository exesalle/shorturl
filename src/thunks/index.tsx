import axios from 'axios';
import {
  login_fail,
  login_success,
  register_fail,
  register_success
} from '../store/auth';
import {
  addLink_success,
  deleteLink_success,
  getLinks_success,
  updateHash_success,
  updateLink_success
} from '../store/reducer';
import {redirectLink_success} from '../store/redirect';
export const register = (payload:any):any => {
  return function(dispatch: any) {
    axios
      .post('http://localhost:5000/api/v1/register', payload)
      .then((res) => {
        console.log(res);
        dispatch(register_success(payload));
      })
      .catch((err) => {
        dispatch(register_fail(err));
      });
  };
};

export const login = (payload:any):any => {
  return function (dispatch: any) {
    axios
      .post('http://localhost:5000/api/v1/login', payload)
      .then((res) => dispatch(login_success(res)))
      .catch((err) => {
        dispatch(login_fail(err));
      });
  };
};

export const getLinks = ():any => {
  return function (dispatch: any) {
    fetch('http://localhost:5000/api/v1/short/all')
      .then(res => res.json())
      .then(json => dispatch(getLinks_success(json)));
  };
};

export const addLink = (link:string):any => {
  return function (dispatch: any) {
    axios
      .post('http://localhost:5000/api/v1/short',{
        origin: link
      })
      .then((res) => dispatch(addLink_success(res)))
      .catch((err) => {
        'empty';
      });
  };
};

export const deleteLink = (id:string):any => {
  return function (dispatch: any) {
    axios
      .delete('http://localhost:5000/api/v1/short/'+id)
      .then((res) => dispatch(deleteLink_success(res)));
  };
};

export const updateHash = (id:string):any => {
  return function (dispatch: any) {
    axios
      .put('http://localhost:5000/api/v1/short/update-hash/'+id)
      .then((res) => dispatch(updateHash_success(res)));
  };
};

export const updateLink = (id:string, link:string):any => {
  return function (dispatch: any) {
    axios
      .put('http://localhost:5000/api/v1/short/update-origin/'+id, {
        origin: link
      })
      .then((res) => dispatch(updateLink_success(res)));
  };
};

export const redirectLink = (hash:string):any => {
  return function (dispatch: any) {
    fetch('http://localhost:5000/api/v1/short/'+hash)
      .then(res => res.json())
      .then(json => dispatch(redirectLink_success(json)));
  };
};