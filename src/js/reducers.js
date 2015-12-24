import * as redux from 'redux';
import todoGroupsReducer from './reducer/todoGroupsReducer';
import * as stateNamespace from './state/stateNamespace';
import undoable from 'redux-undo';

const reducers = redux.combineReducers({
    [stateNamespace.TODO_GROUPS]: undoable(todoGroupsReducer, {
        limit: 10
    })
});

export default reducers;
