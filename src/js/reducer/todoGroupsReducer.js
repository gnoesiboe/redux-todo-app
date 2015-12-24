import * as actionTypes from './../actions/actionTypes';
import { createTodoGroup } from './../model/todoGroupFactory';
import { createTodo } from './../model/todoFactory';
import _ from 'lodash';
import TodoGroupCollection from './../collection/todoGroupCollection';

/**
 * @type {TodoGroupCollection}
 *
 * @private
 */
var _defaultState = new TodoGroupCollection();

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @return {TodoGroupCollection}
 *
 * @private
 */
var _handleAddGroupAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    newTodoGroupCollection.push(
        createTodoGroup(action.title)
    );

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleAddTodoAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.groupCid);
    if (!todoGroup) {
        return currentTodoGroupCollection
    }

    todoGroup.addTodo(
        createTodo(action.title)
    );

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleChangeTodoIsCompletedStatus = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.groupCid);
    if (!todoGroup) {
        return currentTodoGroupCollection
    }

    var todo = todoGroup.get('todos').getOneWithCid(action.cid);
    if (!todo) {
        return currentTodoGroupCollection;
    }

    todo.set('isCompleted', action.newIsCompleted);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleDeleteTodoAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.groupCid);
    if (!todoGroup) {
        return currentTodoGroupCollection
    }

    todoGroup.get('todos').removeOneWithCid(action.cid);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleEditTodoAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.groupCid);
    if (!todoGroup) {
        return currentTodoGroupCollection
    }

    var todo = todoGroup.get('todos').getOneWithCid(action.cid);
    if (!todo) {
        return currentTodoGroupCollection;
    }

    todo.set('title', action.newTitle);
    todo.set('deadline', action.newDeadline);

    // after editing turn of editing mode
    todo.set('isBeingEdited', false);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleEditTodoGroupTitleAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.cid);
    if (!todoGroup) {
        return currentTodoGroupCollection
    }

    todoGroup.set('title', action.newTitle);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleDeleteTodoGroupAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    newTodoGroupCollection.removeOneWithCid(action.cid);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleMoveTodoGroupForwardAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    newTodoGroupCollection.moveForwardWithCid(action.cid);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleMoveTodoGroupBackwardsAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    newTodoGroupCollection.moveBackwardsWithCid(action.cid);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleUpdateGroupStarredStatus = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.cid);
    if (!todoGroup) {
        return currentTodoGroupCollection
    }

    todoGroup.set('isStarred', action.newStatus);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleTodoSortUpdate = function (currentTodoGroupCollection, action) {
    if (action.fromGroupCid === action.toGroupCid) {
        return _handleTodoSortUpdateWithinSameList(currentTodoGroupCollection, action);
    } else {
        return _handleTodoSortUpdateWithDifferentTodoGroups(currentTodoGroupCollection, action);
    }
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleTodoSortUpdateWithDifferentTodoGroups = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    // remove from current todo group
    var fromTodoGroup = newTodoGroupCollection.getOneWithCid(action.fromGroupCid);
    if (!fromTodoGroup) {
        return currentTodoGroupCollection
    }

    var todo = fromTodoGroup.get('todos').get(action.fromIndex);
    if (!todo) {
        return currentTodoGroupCollection;
    }

    fromTodoGroup.get('todos').remove(action.fromIndex);

    // add to new other todo group
    var toTodoGroup = newTodoGroupCollection.getOneWithCid(action.toGroupCid);
    if (!toTodoGroup) {
        return currentTodoGroupCollection;
    }

    toTodoGroup.get('todos').add(todo, action.toIndex);

    // remove isCurrent status as it is now put in another groups context
    todo.set('isCurrent', false);
    _selectFirstTodoInGroup(fromTodoGroup);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleTodoSortUpdateWithinSameList = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.fromGroupCid);
    if (!todoGroup) {
        return currentTodoGroupCollection
    }

    todoGroup.get('todos').moveItem(action.fromIndex, action.toIndex);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleSelectNextTodoGroupAction = function (currentTodoGroupCollection) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent(),
        currentTodoGroupIndex = newTodoGroupCollection.locateCurrent();

    if (currentTodoGroup === null || currentTodoGroupIndex === null) {
        return _handleSelectionOfFirstTodoGroup(currentTodoGroupCollection, newTodoGroupCollection);
    }

    // deselect current todo group
    currentTodoGroup.set('isCurrent', false);
    _deselectTodosInGroup(currentTodoGroup);

    // select new todo group
    var newCurrentTodoGroup = newTodoGroupCollection.getFirstLocatedAfter(currentTodoGroupIndex);
    if (!newCurrentTodoGroup) {
        return currentTodoGroupCollection;
    }

    newCurrentTodoGroup.set('isCurrent', true);
    _selectFirstTodoInGroup(newCurrentTodoGroup);

    return newTodoGroupCollection
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleSelectPreviousTodoGroupAction = function (currentTodoGroupCollection) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent(),
        currentTodoGroupIndex = newTodoGroupCollection.locateCurrent();

    if (currentTodoGroup === null || currentTodoGroupIndex === null) {
        return _handleSelectionOfFirstTodoGroup(currentTodoGroupCollection, newTodoGroupCollection);
    }

    // deselect current todo group
    currentTodoGroup.set('isCurrent', false);
    _deselectTodosInGroup(currentTodoGroup);

    // select new todo group
    var newCurrentTodoGroup = newTodoGroupCollection.getFirstLocatedBefore(currentTodoGroupIndex);
    if (!newCurrentTodoGroup) {
        return currentTodoGroupCollection;
    }

    newCurrentTodoGroup.set('isCurrent', true);
    _selectFirstTodoInGroup(newCurrentTodoGroup);

    return newTodoGroupCollection
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleSelectNextTodoAction = function (currentTodoGroupCollection) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent(),
        currentTodoGroupIndex = newTodoGroupCollection.locateCurrent();

    if (currentTodoGroup === null || currentTodoGroupIndex === null) {
        return _handleSelectionOfFirstTodoGroup(currentTodoGroupCollection, newTodoGroupCollection);
    }

    var todos = currentTodoGroup.get('todos'),
        currentTodo = todos.getCurrent(),
        currentTodoIndex = todos.locateCurrent();

    if (currentTodo === null || currentTodoIndex === null) {
        _selectFirstTodoInGroup(currentTodoGroup);
    } else {
        // deselect current todo
        currentTodo.set('isCurrent', false);

        var newCurrentTodo = todos.getFirstLocatedAfter(currentTodoIndex)

        if (!newCurrentTodo) {
            return newTodoGroupCollection;
        }

        // select new todo
        newCurrentTodo.set('isCurrent', true);
    }

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleSelectPreviousTodoAction = function (currentTodoGroupCollection) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent(),
        currentTodoGroupIndex = newTodoGroupCollection.locateCurrent();

    if (currentTodoGroup === null || currentTodoGroupIndex === null) {
        return _handleSelectionOfFirstTodoGroup(currentTodoGroupCollection, newTodoGroupCollection);
    }

    var todos = currentTodoGroup.get('todos'),
        currentTodo = todos.getCurrent(),
        currentTodoIndex = todos.locateCurrent();

    if (currentTodo === null || currentTodoIndex === null) {
        _selectFirstTodoInGroup(currentTodoGroup);
    } else {
        // deselect current todo
        currentTodo.set('isCurrent', false);

        var newCurrentTodo = todos.getFirstLocatedBefore(currentTodoIndex)

        if (!newCurrentTodo) {
            return newTodoGroupCollection;
        }

        // select new todo
        newCurrentTodo.set('isCurrent', true);
    }

    return newTodoGroupCollection;
};

/**
 *
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleSwitchToTodoEditModeAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.groupCid);
    if (!todoGroup) {
        return currentTodoGroupCollection;
    }

    var todo = todoGroup.get('todos').getOneWithCid(action.cid);
    if (!todo) {
        return currentTodoGroupCollection;
    }

    todo.set('isBeingEdited', true);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {Object} action
 *
 * @return {TodoGroupCollection}
 *
 * @private
 */
var _handleEditCurrentTodoAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent();
    if (!currentTodoGroup) {
        return currentTodoGroupCollection;
    }

    var currentTodo = currentTodoGroup.get('todos').getCurrent();
    if (!currentTodo) {
        return currentTodoGroupCollection;
    }

    currentTodo.set('isBeingEdited', true);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 * @param {TodoGroupCollection} newTodoGroupCollection
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleSelectionOfFirstTodoGroup = function (currentTodoGroupCollection, newTodoGroupCollection) {
    var firstTodoGroup = newTodoGroupCollection.first();

    if (!firstTodoGroup) {
        return currentTodoGroupCollection;
    }

    firstTodoGroup.set('isCurrent', true);

    _selectFirstTodoInGroup(firstTodoGroup);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroup} todoGroup
 *
 * @private
 */
var _deselectTodosInGroup = function (todoGroup) {
    todoGroup.get('todos').forEach(function (todoGroup) {
         todoGroup.set('isCurrent', false);
    });
};

/**
 * @param {TodoGroup} todoGroup
 *
 * @private
 */
var _selectFirstTodoInGroup = function (todoGroup) {
    var firstTodo = todoGroup.get('todos').first();

    if (!firstTodo) {
        return;
    }

    firstTodo.set('isCurrent', true);
};

/**
 * @param {TodoGroupCollection} currentState
 * @param {Object} action
 *
 * @returns {TodoGroupCollection}
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
            return _handleMoveTodoGroupForwardAction(currentState, action);

        case actionTypes.MOVE_TODO_GROUP_BACKWARDS:
            return _handleMoveTodoGroupBackwardsAction(currentState, action);

        case actionTypes.UPDATE_GROUP_STARRED_STATUS:
            return _handleUpdateGroupStarredStatus(currentState, action);

        case actionTypes.TODO_SORT_UPDATE:
            return _handleTodoSortUpdate(currentState, action);

        case actionTypes.SELECT_NEXT_TODO_GROUP:
            return _handleSelectNextTodoGroupAction(currentState);

        case actionTypes.SELECT_PREVIOUS_TODO_GROUP:
            return _handleSelectPreviousTodoGroupAction(currentState);

        case actionTypes.SELECT_NEXT_TODO:
            return _handleSelectNextTodoAction(currentState);

        case actionTypes.SELECT_PREVIOUS_TODO:
            return _handleSelectPreviousTodoAction(currentState);

        case actionTypes.SWITCH_TO_TODO_EDIT_MODE:
            return _handleSwitchToTodoEditModeAction(currentState, action);

        case actionTypes.EDIT_CURRENT_TODO:
            return _handleEditCurrentTodoAction(currentState);

        default:
            return currentState;
    }
};
