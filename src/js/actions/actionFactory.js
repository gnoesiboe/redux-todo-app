import * as actionTypes from './actionTypes';

/**
 * @param {String} title
 *
 * @returns {Object}
 */
export function createAddGroupAction(title) {
    return {
        type: actionTypes.ADD_GROUP,
        title: title
    };
}

/**
 * @param {String} cid
 * @param {Boolean} newIsCompleted
 * @param {String} groupCid
 *
 * @returns {Object}
 */
export function createChangeTodoIsCompletedStatusAction(cid, newIsCompleted, groupCid) {
    return {
        type: actionTypes.CHANGE_TODO_IS_COMPLETED_STATUS,
        cid: cid,
        newIsCompleted: newIsCompleted,
        groupCid: groupCid
    };
}

/**
 * @param {String} title
 * @param {String} groupCid
 *
 * @returns {Object}
 */
export function createAddTodoAction(title, groupCid) {
    return {
        type: actionTypes.ADD_TODO,
        title: title,
        groupCid: groupCid
    };
}
