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

/**
 * @param {String} cid
 * @param {String} groupCid
 *
 * @returns {Object}
 */
export function createDeleteTodoAction(cid, groupCid) {
    return {
        type: actionTypes.DELETE_TODO,
        cid: cid,
        groupCid: groupCid
    };
}

/**
 * @param {String} cid
 * @param {String} newTitle
 * @param {String} newDeadline
 * @param {String} groupCid
 *
 * @returns {Object}
 */
export function createEditTodoAction(cid, newTitle, newDeadline, groupCid) {
    return {
        type: actionTypes.EDIT_TODO,
        cid: cid,
        newTitle: newTitle,
        newDeadline: newDeadline,
        groupCid: groupCid
    };
}

/**
 * @param {String} cid
 * @param {String} newTitle
 *
 * @returns {Object}
 */
export function createChangeTodoGroupTitleAction(cid, newTitle) {
    return {
        type: actionTypes.EDIT_TODO_GROUP_TITLE,
        cid: cid,
        newTitle: newTitle
    };
}

/**
 * @param {String} cid
 *
 * @returns {Object}
 */
export function createDeleteTodoGroupAction(cid) {
    return {
        type: actionTypes.DELETE_TODO_GROUP,
        cid: cid
    };
}

/**
 * @param {String} cid
 *
 * @returns {Object}
 */
export function createMoveTodoGroupForwardAction(cid) {
    return {
        type: actionTypes.MOVE_TODO_GROUP_FORWARD,
        cid: cid
    };
}

/**
 * @param {String} cid
 *
 * @returns {Object}
 */
export function createMoveTodoGroupBackwardsAction(cid) {
    return {
        type: actionTypes.MOVE_TODO_GROUP_BACKWARDS,
        cid: cid
    };
}

/**
 * @param {String} cid
 * @param {String} groupCid
 *
 * @returns {Object}
 */
export function createMoveTodoUpAction(cid, groupCid) {
    return {
        type: actionTypes.MOVE_TODO_UP,
        cid: cid,
        groupCid: groupCid
    };
}

/**
 * @param {String} cid
 * @param {String} groupCid
 *
 * @returns {Object}
 */
export function createMoveTodoDownAction(cid, groupCid) {
    return {
        type: actionTypes.MOVE_TODO_DOWN,
        cid: cid,
        groupCid: groupCid
    };
}

/**
 * @param {String} cid
 * @param {String} newStatus
 *
 * @return {Object}
 */
export function createUpdateGroupStarredStatusAction(cid, newStatus) {
    return {
        type: actionTypes.UPDATE_GROUP_STARRED_STATUS,
        cid: cid,
        newStatus: newStatus
    };
}

/**
 * @param {String} fromGroupCid
 * @param {String} toGroupCid
 * @param {Number} fromIndex
 * @param {Number} toIndex
 *
 * @returns {Object}
 */
export function createTodoSortUpdateAction(fromGroupCid, toGroupCid, fromIndex, toIndex) {
    return {
        type: actionTypes.TODO_SORT_UPDATE,
        fromGroupCid: fromGroupCid,
        toGroupCid: toGroupCid,
        fromIndex: fromIndex,
        toIndex: toIndex
    };
}
