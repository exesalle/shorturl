import {ActionTypes, IShortedLinks} from '../Types';

type StateType = {
  links: IShortedLinks[]
}

const initialState: StateType = {
  links: []
};

export const Reducer = (state = initialState, action: { type: ActionTypes, payload: any }): StateType => {
  switch (action.type){

  case ActionTypes.GET_LINKS_SUCCESS: {
    return {
      links: [
        ...action.payload
      ]
    };
  }
  case ActionTypes.ADD_LINK: {
    return {
      ...state,
      links: [
        ...state.links,
        action.payload
      ]
    };
  }
  case ActionTypes.DELETE_LINK: {
    return {
      ...state,
      links: [
        ...state.links,
        action.payload
      ]
    };
  }


  default:
    return state;
  }
};

export const getLinks_success = (payload:any) => {
  return {
    type: 'GET_LINKS_SUCCESS',
    payload
  };
};

export const addLink_success = (payload:any) => {
  return {
    type: 'ADD_LINK',
    payload
  };
};

export const deleteLink_success = (payload:any) => {
  return {
    type: 'DELETE_LINK',
    payload
  };
};

export const updateHash_success = (payload:any) => {
  return {
    type: 'UPDATE_HASH',
    payload
  };
};

export const updateLink_success = (payload:any) => {
  return {
    type: 'UPDATE_LINK',
    payload
  };
};

