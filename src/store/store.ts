import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Reducer } from './reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  Reducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;