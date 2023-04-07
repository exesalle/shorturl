

export interface IUserData {
login:string,
  password:string
}

export const InitialTeachers: IUserData[] = [
];

export interface IShortedLinks {
  _id:string
  origin:string
  hash:string
}

export enum ActionTypes {
  ADD_LINK = 'ADD_LINK',
  REDIRECT_LINK = 'REDIRECT_LINK',
  UPDATE_LINK = 'UPDATE_LINK',
  UPDATE_HASH = 'UPDATE_HASH',
  DELETE_LINK = 'DELETE_LINK',
  GET_LINKS_SUCCESS = 'GET_LINKS_SUCCESS',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',

}

export const InitialShortedLinks: IShortedLinks[] = [];