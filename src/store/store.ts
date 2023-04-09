import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Reducer } from './reducers/reducer';
import thunk from 'redux-thunk';
import {AuthReducer} from './reducers/authReducer';
import {RedirectReducer} from './reducers/redirectReducer';

const rootReducer = combineReducers({
  Reducer,
  AuthReducer,
  Redirect: RedirectReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;