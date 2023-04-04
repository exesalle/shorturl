

export interface IUserData {
  name:string
  email:string
  password:string
}

export const InitialTeachers: IUserData[] = [
];

export interface IShortedLinks {
  id:number
  link:string
  short:string
}

export enum ActionTypes {
  ADD_LINK = 'ADD_LINK',
  EDIT_LINK = 'EDIT_LINK',
  REMOVE_LINK = 'REMOVE_LINK',

  GET_LINKS = 'GET_LINKS'
}

export const InitialShortedLinks: IShortedLinks[] = [];