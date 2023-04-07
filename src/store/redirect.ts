import {ActionTypes} from '../Types';



const initialState = {
  link: null,
};

export const Redirect = (state = initialState, action: { type: ActionTypes, payload: any }) => {
  switch (action.type) {
  case ActionTypes.REDIRECT_LINK:
    return { ...state, link: action.payload };
  default:
    return state;
  }
};

export const redirectLink_success = (payload:any) => {
  return {
    type: 'REDIRECT_LINK',
    payload
  };
};
