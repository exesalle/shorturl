import {ActionTypes} from '../Types';

const initialState = {
  isRegister: false,
  isAuth: false,
  error: ''
};

export const AuthReducer = (state = initialState, action: { type: ActionTypes, payload: any }) => {
  switch (action.type){
  case ActionTypes.REGISTER_SUCCESS: {
    return {
      ...state,
      isRegister: true,
    };
  }
  case ActionTypes.REGISTER_FAIL: {
    return {
      ...state,
      error: 'login already in use',
    };
  }

  case ActionTypes.LOGIN_SUCCESS: {
    return {
      ...state,
      isAuth: true
    };
  }

  case ActionTypes.LOGIN_FAIL: {
    return {
      ...state,
      error: 'wrong login or password'
    };
  }

  default:
    return state;
  }
};

export const register_success = (payload:any) => {
  return {
    type: 'REGISTER_SUCCESS',
    payload
  };
};

export const register_fail = (payload:any) => {
  return {
    type: 'REGISTER_FAIL',
    payload
  };
};

export const login_success = (payload:any) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload
  };
};

export const login_fail = (payload:any) => {
  return {
    type: 'LOGIN_FAIL',
    payload
  };
};

