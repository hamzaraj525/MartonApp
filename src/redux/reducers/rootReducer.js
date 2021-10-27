import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import CatReducer from './CatReducer';

let allReducer = {
  UserReducer,
  CatReducer
};

let reducers = combineReducers(allReducer);

export default reducers;
