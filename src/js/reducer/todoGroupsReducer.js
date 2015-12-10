import * as actionTypes from './../actions/actionTypes';
import { List } from 'immutable';
import { createTodoGroup } from './../model/todoGroupFactory';
import { createTodo } from './../model/todoFactory';
import * as listHelper from './../utility/listHelper';

/**
 * @type {List}
 */
var _defaultState = List();

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @return {List}
 *
 * @private
 */
var _handleAddGroupAction = function (currentState, action) {
    return currentState.push(
        createTodoGroup(action.title)
    );
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handleChangeTodoIsCompletedStatus = function (currentState, action) {
    var [ foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.groupCid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var groupTodos = foundGroup.get('todos'),
        [ foundTodo, foundTodoAtIndex ] = _locateTodoInListState(action.cid, groupTodos);

    if (foundTodo === null || foundTodoAtIndex === null) {
        return currentState;
    }

    var newTodo = foundTodo.set('isCompleted', action.newIsCompleted),
        newGroupTodos = groupTodos.set(foundTodoAtIndex, newTodo),
        newGroup = foundGroup.set('todos', newGroupTodos);

    return currentState.set(foundGroupAtIndex, newGroup);
};

/**
 * @param {Object} currentState
 * @param {Object} action
 *
 * @private
 */
var _handleDeleteTodoAction = function (currentState, action) {
    var [ foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.groupCid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var groupTodos = foundGroup.get('todos'),
        foundTodoAtIndex = _locateTodoInListState(action.cid, groupTodos)[1];

    var newGroupTodos = groupTodos.splice(foundTodoAtIndex, 1),
        newGroup = foundGroup.set('todos', newGroupTodos);

    return currentState.set(foundGroupAtIndex, newGroup);
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handleEditTodoAction = function (currentState, action) {
    var [ foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.groupCid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var groupTodos = foundGroup.get('todos'),
        [ foundTodo, foundTodoAtIndex ] = _locateTodoInListState(action.cid, groupTodos);

    if (foundTodo === null || foundTodoAtIndex === null) {
        return currentState;
    }

    var newTodo = foundTodo
        .set('title', action.newTitle)
        .set('deadline', action.newDeadline);

    var newGroupTodos = groupTodos.set(foundTodoAtIndex, newTodo),
        newGroup = foundGroup.set('todos', newGroupTodos);

    return currentState.set(foundGroupAtIndex, newGroup);
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handleEditTodoGroupTitleAction = function (currentState, action) {
    var [ foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.cid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    return currentState.set(
        foundGroupAtIndex,
        foundGroup.set('title', action.newTitle)
    );
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handleDeleteTodoGroupAction = function (currentState, action) {
    var foundGroupAtIndex = _locateGroupInState(action.cid, currentState)[1];

    if (foundGroupAtIndex === null) {
        return currentState;
    }

    return currentState.splice(foundGroupAtIndex, 1);
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handlemoveTodoGroupForwardAction = function (currentState, action) {
    var [foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.cid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var newGroupIndex = foundGroupAtIndex + 1 <= currentState.count() - 1
        ? foundGroupAtIndex + 1
        : 0;

    return listHelper.moveItem(currentState, foundGroupAtIndex, newGroupIndex);
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handlemoveTodoGroupBackwardsAction = function (currentState, action) {
    var [foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.cid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var newGroupIndex = foundGroupAtIndex - 1 >= 0
        ? foundGroupAtIndex - 1
        : currentState.count() - 1;

    return listHelper.moveItem(currentState, foundGroupAtIndex, newGroupIndex);
};

/**
 * @param {Object} currentState
 * @param {Object} action
 *
 * @return {Object}
 *
 * @private
 */
var _handleAddTodoAction = function (currentState, action) {
    var [ foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.groupCid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var groupTodos = foundGroup.get('todos');

    var newGroupTodos = groupTodos.push(
        createTodo(action.title)
    );

    var newGroup = foundGroup.set('todos', newGroupTodos);

    return currentState.set(foundGroupAtIndex, newGroup);
};

/**
 * @param {String} cid
 * @param {List} state
 *
 * @returns {Array|null}
 *
 * @private
 */
var _locateGroupInState = function (cid, state) {
    var foundGroup = null,
        foundGroupAtIndex = null;

    state.map(function (group, index) {
        if (group.get('cid') === cid) {
            foundGroup = group;
            foundGroupAtIndex = index;
        }
    });

    return [foundGroup, foundGroupAtIndex];
};

/**
 * @param {String} cid
 * @param {List} state
 *
 * @returns {Array}
 *
 * @private
 */
var _locateTodoInListState = function (cid, state) {
    var foundTodo = null,
        foundTodoAtIndex = null;

    state.map(function (todo, index) {
        if (todo.get('cid') === cid) {
            foundTodo = todo;
            foundTodoAtIndex = index;
        }
    });

    return [ foundTodo, foundTodoAtIndex ];
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 */
export default function todoGroupsReducer(currentState = _defaultState, action) {
    switch (action.type) {
        case actionTypes.ADD_GROUP:
            return _handleAddGroupAction(currentState, action);

        case actionTypes.CHANGE_TODO_IS_COMPLETED_STATUS:
            return _handleChangeTodoIsCompletedStatus(currentState, action);

        case actionTypes.ADD_TODO:
            return _handleAddTodoAction(currentState, action);

        case actionTypes.DELETE_TODO:
            return _handleDeleteTodoAction(currentState, action);

        case actionTypes.EDIT_TODO:
            return _handleEditTodoAction(currentState, action);

        case actionTypes.EDIT_TODO_GROUP_TITLE:
            return _handleEditTodoGroupTitleAction(currentState, action);

        case actionTypes.DELETE_TODO_GROUP:
            return _handleDeleteTodoGroupAction(currentState, action);

        case actionTypes.MOVE_TODO_GROUP_FORWARD:
            return _handlemoveTodoGroupForwardAction(currentState, action);

        case actionTypes.MOVE_TODO_GROUP_BACKWARDS:
            return _handlemoveTodoGroupBackwardsAction(currentState, action);

        default:
            return currentState;
    }
};
