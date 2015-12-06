import * as redux from 'redux';
import todoGroupsReducer from './reducer/todoGroupsReducer';
import * as stateNamespace from './state/stateNamespace';

const reducers = redux.combineReducers({
    [stateNamespace.TODO_GROUPS]: todoGroupsReducer
});

export default reducers;
