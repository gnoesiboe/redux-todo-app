import * as redux from 'redux';
import todoGroupsReducer from './reducer/todoGroupsReducer';

const reducers = redux.combineReducers({
    todoGroups: todoGroupsReducer
});

export default reducers;
