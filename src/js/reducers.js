import * as redux from 'redux';
import todoGroupsReducer from './reducer/todoGroupsReducer';
import * as stateNamespace from './state/stateNamespace';
import undoable, { distinctState } from 'redux-undo';

const reducers = redux.combineReducers({
    [stateNamespace.TODO_GROUPS]: undoable(todoGroupsReducer)
});

export default reducers;
