import * as actionTypes from './../actions/actionTypes';
import _ from 'lodash';

/**
 * @type {Object}
 *
 * @private
 */
var _defaultState = {
    showExplanation: false
};

/**
 * @param {Object} currentState
 * @param {Object} action
 *
 * @returns {Object}
 *
 * @private
 */
var _handleToggleShowExplanationAction = function (currentState, action) {
    return _.extend({}, currentState, {
        showExplanation: !currentState.showExplanation
    });
};

/**
 * @param {Object} currentState
 * @param {Object} action
 */
export default function currentReducer(currentState = _defaultState, action) {
    switch (action.type) {
        case actionTypes.TOGGLE_SHOW_EXPLANATION:
            return _handleToggleShowExplanationAction(currentState, action);

        default:
            return currentState;
    }
};
