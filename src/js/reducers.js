import * as redux from 'redux';
import someActionReducer from './reducer/someActionReducer';

const reducers = redux.combineReducers({
    someKey: someActionReducer
});

export default reducers;
