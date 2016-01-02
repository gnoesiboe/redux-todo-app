import * as actionTypes from './../actions/actionTypes';
import { createTodoGroup } from './../model/todoGroupFactory';
import { createTodo } from './../model/todoFactory';
import TodoGroupCollection from './../collection/todoGroupCollection';
import deepFreeze from 'deep-freeze-strict';

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
        throw new Error('Todo group to place todo in, not found');
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
        throw new Error('Could not find todo group');
    }

    var todo = todoGroup.get('todos').getOneWithCid(action.cid);
    if (!todo) {
        throw new Error('Could not find todo in supplied todo group');
    }

    todo.set('isCompleted', action.newIsCompleted);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleToggleCurrentTodoIsCompletedStatus = function (currentTodoGroupCollection) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent();
    if (!currentTodoGroup) {
        throw new Error('No currently selected todo group');
    }

    var currentTodo = currentTodoGroup.get('todos').getCurrent();
    if (!currentTodo) {
        throw new Error('No currently selected todo found in current todo group');
    }

    currentTodo.toggleIsCompleted();

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
        throw new Error('Todo group not found to delete todo from');
    }

    var todoGroupTodos = todoGroup.get('todos');
    if (!todoGroupTodos.hasOneWithCid(action.cid)) {
        throw new Error('Todo not found in todo group');
    }

    todoGroupTodos.removeOneWithCid(action.cid);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 *
 * @returns {TodoGroupCollection}
 *
 * @private
 */
var _handleDeleteCurrentTodoAction = function (currentTodoGroupCollection) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent();
    if (!currentTodoGroup) {
        throw new Error('No current todo group found');
    }

    var todos = currentTodoGroup.get('todos'),
        currentTodoIndex = todos.locateCurrent();

    if (currentTodoIndex === null) {
        throw new Error('No current todo found in current todo group');
    }

    todos.remove(currentTodoIndex);

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
        throw new Error('Could not find todo group');
    }

    var todo = todoGroup.get('todos').getOneWithCid(action.cid);
    if (!todo) {
        throw new Error('Could not find todo in todo group');
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
var _handleToggleTodoIsStarredStatusAction = function (currentTodoGroupCollection, action) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var todoGroup = newTodoGroupCollection.getOneWithCid(action.groupCid);
    if (!todoGroup) {
        throw new Error('Could not find todo group');
    }

    var todo = todoGroup.get('todos').getOneWithCid(action.cid);
    if (!todo) {
        throw new Error('Could not find todo in todo group');
    }

    todo.set('isStarred', !todo.get('isStarred', false));

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
        throw new Error('Todo group not found');
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

    if (!newTodoGroupCollection.hasOneWithCid(action.cid)) {
        throw new Error('Todo group not found');
    }

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

    if (!newTodoGroupCollection.hasOneWithCid(action.cid)) {
        throw new Error('Todo group not found');
    }

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

    if (!newTodoGroupCollection.hasOneWithCid(action.cid)) {
        throw new Error('Todo group not found');
    }

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
        throw new Error('Todo group not found');
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
        throw new Error('Previous todo group not found');
    }

    var todo = fromTodoGroup.get('todos').get(action.fromIndex);
    if (!todo) {
        throw new Error('Todo not found in previous todo group');
    }

    fromTodoGroup.get('todos').remove(action.fromIndex);

    // add to new other todo group
    var toTodoGroup = newTodoGroupCollection.getOneWithCid(action.toGroupCid);
    if (!toTodoGroup) {
        throw new Error('Target todo group not found');
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
        throw new Error('Todo group not found');
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
        throw new Error('New current todo group not found');
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
        throw new Error('New current todo group not found');
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

        var newCurrentTodo = todos.getFirstLocatedAfter(currentTodoIndex);
        if (!newCurrentTodo) {
            throw new Error('Could not define new current todo');
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

        var newCurrentTodo = todos.getFirstLocatedBefore(currentTodoIndex);
        if (!newCurrentTodo) {
            throw new Error('Could not define new current todo');
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
        throw new Error('Todo group not found');
    }

    var todo = todoGroup.get('todos').getOneWithCid(action.cid);
    if (!todo) {
        throw new Error('Todo not found in todo group');
    }

    todo.set('isBeingEdited', true);

    return newTodoGroupCollection;
};

/**
 * @param {TodoGroupCollection} currentTodoGroupCollection
 *
 * @return {TodoGroupCollection}
 *
 * @private
 */
var _handleEditCurrentTodoAction = function (currentTodoGroupCollection) {
    var newTodoGroupCollection = currentTodoGroupCollection.clone();

    var currentTodoGroup = newTodoGroupCollection.getCurrent();
    if (!currentTodoGroup) {
        throw new Error('No current todo group found');
    }

    var currentTodo = currentTodoGroup.get('todos').getCurrent();
    if (!currentTodo) {
        throw new Error('No current todo found in current todo group');
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

    // ensure that current state and action are not mutated
    deepFreeze(currentState);
    deepFreeze(action);

    switch (action.type) {
        case actionTypes.ADD_GROUP:
            return _handleAddGroupAction(currentState, action);

        case actionTypes.CHANGE_TODO_IS_COMPLETED_STATUS:
            return _handleChangeTodoIsCompletedStatus(currentState, action);

        case actionTypes.TOGGLE_CURRENT_TODO_IS_COMPLETED_STATUS:
            return _handleToggleCurrentTodoIsCompletedStatus(currentState);

        case actionTypes.ADD_TODO:
            return _handleAddTodoAction(currentState, action);

        case actionTypes.DELETE_TODO:
            return _handleDeleteTodoAction(currentState, action);

        case actionTypes.DELETE_CURRENT_TODO:
            return _handleDeleteCurrentTodoAction(currentState);

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

        case actionTypes.TOGGLE_TODO_IS_STARRED_STATUS:
            return _handleToggleTodoIsStarredStatusAction(currentState, action);

        default:
            return currentState;
    }
};
