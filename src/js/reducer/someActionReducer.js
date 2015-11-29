import * as actionTypes from './../actions/actionTypes';
import { List } from 'immutable';

/**
 * @type {List}
 */
var _defaultState = List.of();

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @return {List}
 *
 * @private
 */
var _handleSomeAction = function (currentState, action) {
    //@todo replace with soome useful shit

    return currentState.push(Date.now());
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 */
export default function someActionReducer(currentState = _defaultState, action) {
    switch (action.type) {
        case actionTypes.SOME_ACTION:
            return _handleSomeAction(currentState, action);
            break;

        default:
            return currentState;
    }
};
