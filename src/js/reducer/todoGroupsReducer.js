import * as actionTypes from './../actions/actionTypes';
import { List } from 'immutable';
import { createTodoGroup } from './../model/todoGroupFactory';
import { createTodo } from './../model/todoFactory';

/**
 * @type {List}
 */
var _defaultState = List.of(
    createTodoGroup('Vulputate Inceptos Etiam'),
    createTodoGroup('Fermentum Vestibulum')
);

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
 * @param {List} currentState
 * @param {Object} action
 *
 * @return {List}
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

        default:
            return currentState;
    }
};
