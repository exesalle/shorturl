import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Reducer } from './reducer';
import thunk from 'redux-thunk';
import {AuthReducer} from './auth';
import {Redirect} from './redirect';

const rootReducer = combineReducers({
  Reducer,
  AuthReducer,
  Redirect
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;