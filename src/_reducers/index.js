import { combineReducers } from 'redux';
import { areas } from './reducers.areas';
import { user } from './reducers.authentication';

export default combineReducers({
    areas,
    user
});