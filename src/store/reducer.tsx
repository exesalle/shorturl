import {ActionTypes, IShortedLinks} from '../Types';

type StateType = {
  links: IShortedLinks[]
}

const initialState: StateType = {
  links: []
};

export const Reducer = (state = initialState, action: { type: ActionTypes, payload: any }): StateType => {
  switch (action.type){
  case ActionTypes.GET_LINKS:
    return {
      ...state,
      links: [
        ...state.links,
        action.payload
      ]
    };
  default:
    return state;
  }
};

export const getLinks = (payload:any) =>  ({type: 'GET_LINKS', payload});
