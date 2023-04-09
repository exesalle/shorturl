import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Reducer } from './reducers/reducer';
import thunk from 'redux-thunk';
import {AuthReducer} from './reducers/authReducer';
const rootReducer = combineReducers({
  Reducer,
  AuthReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;