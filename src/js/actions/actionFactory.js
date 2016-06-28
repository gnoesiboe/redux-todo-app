import * as actionTypes from './actionTypes';

/**
 * @param {Object} action
 *
 * @returns {Function}
 *
 * @private
 */
var _packageInSimplePromise = function (action) {
    return function (dispatch) {
        return new Promise(function (resolve, reject) {
            try {
                dispatch(action);

                resolve(action);
            } catch (error) {
                reject(error);
            }
        });
    };
};

/**
 * @param {String} title
 *
 * @returns {Function}
 */
export function createAddGroupAction(title) {
    return _packageInSimplePromise({
        type: actionTypes.ADD_GROUP,
        title: title
    });
}

/**
 * @param {String} cid
 * @param {Boolean} newIsCompleted
 * @param {String} groupCid
 *
 * @returns {Function}
 */
export function createChangeTodoIsCompletedStatusAction(cid, newIsCompleted, groupCid) {
    return _packageInSimplePromise({
        type: actionTypes.CHANGE_TODO_IS_COMPLETED_STATUS,
        cid: cid,
        newIsCompleted: newIsCompleted,
        groupCid: groupCid
    });
}

/**
 *
 * @returns {Function}
 */
export function createToggleCurrentTodoIsCompletedStatusAction() {
    return _packageInSimplePromise({
        type: actionTypes.TOGGLE_CURRENT_TODO_IS_COMPLETED_STATUS
    });
}

/**
 * @param {String} title
 * @param {String} groupCid
 *
 * @returns {Function}
 */
export function createAddTodoAction(title, groupCid) {
    return _packageInSimplePromise({
        type: actionTypes.ADD_TODO,
        title: title,
        groupCid: groupCid
    });
}

/**
 * @param {String} cid
 * @param {String} groupCid
 *
 * @returns {Function}
 */
export function createDeleteTodoAction(cid, groupCid) {
    return _packageInSimplePromise({
        type: actionTypes.DELETE_TODO,
        cid: cid,
        groupCid: groupCid
    });
}

/**
 * @param {String} cid
 * @param {String} newTitle
 * @param {String} newDeadline
 * @param {String} groupCid
 *
 * @returns {Function}
 */
export function createEditTodoAction(cid, newTitle, newDeadline, groupCid) {
    return _packageInSimplePromise({
        type: actionTypes.EDIT_TODO,
        cid: cid,
        newTitle: newTitle,
        newDeadline: newDeadline,
        groupCid: groupCid
    });
}

/**
 * @param {String} cid
 * @param {String} newTitle
 *
 * @returns {Function}
 */
export function createEditTodoGroupTitleAction(cid, newTitle) {
    return _packageInSimplePromise({
        type: actionTypes.EDIT_TODO_GROUP_TITLE,
        cid: cid,
        newTitle: newTitle
    });
}

/**
 * @param {String} cid
 *
 * @returns {Function}
 */
export function createDeleteTodoGroupAction(cid) {
    return _packageInSimplePromise({
        type: actionTypes.DELETE_TODO_GROUP,
        cid: cid
    });
}

/**
 * @param {String} cid
 *
 * @returns {Function}
 */
export function createMoveTodoGroupForwardAction(cid) {
    return _packageInSimplePromise({
        type: actionTypes.MOVE_TODO_GROUP_FORWARD,
        cid: cid
    });
}

/**
 * @param {String} cid
 *
 * @returns {Function}
 */
export function createMoveTodoGroupBackwardsAction(cid) {
    return _packageInSimplePromise({
        type: actionTypes.MOVE_TODO_GROUP_BACKWARDS,
        cid: cid
    });
}

/**
 * @param {String} cid
 * @param {String} newStatus
 *
 * @return {Function}
 */
export function createUpdateGroupStarredStatusAction(cid, newStatus) {
    return _packageInSimplePromise({
        type: actionTypes.UPDATE_GROUP_STARRED_STATUS,
        cid: cid,
        newStatus: newStatus
    });
}

/**
 * @param {String} fromGroupCid
 * @param {String} toGroupCid
 * @param {Number} fromIndex
 * @param {Number} toIndex
 *
 * @returns {Function}
 */
export function createTodoSortUpdateAction(fromGroupCid, toGroupCid, fromIndex, toIndex) {
    return _packageInSimplePromise({
        type: actionTypes.TODO_SORT_UPDATE,
        fromGroupCid: fromGroupCid,
        toGroupCid: toGroupCid,
        fromIndex: fromIndex,
        toIndex: toIndex
    });
}

/**
 * @returns {Function}
 */
export function createSelectNextTodoGroupAction() {
    return _packageInSimplePromise({
        type: actionTypes.SELECT_NEXT_TODO_GROUP
    });
}

/**
 * @returns {Function}
 */
export function createSelectPreviousTodoGroupAction() {
    return _packageInSimplePromise({
        type: actionTypes.SELECT_PREVIOUS_TODO_GROUP
    });
}

/**
 * @returns {Function}
 */
export function createSelectNextTodoAction() {
    return _packageInSimplePromise({
        type: actionTypes.SELECT_NEXT_TODO
    });
}

/**
 * @returns {Function}
 */
export function createSelectPreviousTodoAction() {
    return _packageInSimplePromise({
        type: actionTypes.SELECT_PREVIOUS_TODO
    });
}

/**
 * @returns {Function}
 */
export function createEditCurrentTodoAction() {
    return _packageInSimplePromise({
        type: actionTypes.EDIT_CURRENT_TODO
    });
}

/**
 * @param {String} cid
 * @param {String} groupCid
 *
 * @returns {Function}
 */
export function createSwitchToTodoEditModeAction(cid, groupCid) {
    return _packageInSimplePromise({
        type: actionTypes.SWITCH_TO_TODO_EDIT_MODE,
        cid: cid,
        groupCid: groupCid
    });
}

/**
 * @returns {Function}
 */
export function createDeleteCurrentTodoAction() {
    return _packageInSimplePromise({
        type: actionTypes.DELETE_CURRENT_TODO
    });
}

/**
 * @param {String} cid
 * @param {String} groupCid
 *
 * @returns {Function}
 */
export function createToggleTodoIsStarredStatusAction(cid, groupCid) {
    return _packageInSimplePromise({
        type: actionTypes.TOGGLE_TODO_IS_STARRED_STATUS,
        cid: cid,
        groupCid: groupCid
    });
}

/**
 * @returns {Function}
 */
export function createToggleCurrentTodoIsStarredStatusAction() {
    return _packageInSimplePromise({
        type: actionTypes.TOGGLE_CURRENT_TODO_IS_STARRED_STATUS
    });
}

/**
 * @returns {Object}
 */
export function createToggleShowExplanationAction() {
    return {
        type: actionTypes.TOGGLE_SHOW_EXPLANATION
    };
}
