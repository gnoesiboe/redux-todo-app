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
 * @param {List} currentState
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
var _handleMoveTodoUpAction = function (currentState, action) {
    var [ foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.groupCid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var groupTodos = foundGroup.get('todos'),
        [ foundTodo, foundTodoAtIndex ] = _locateTodoInListState(action.cid, groupTodos);

    if (foundTodo === null || foundTodoAtIndex === null) {
        return currentState;
    }

    var newTodoIndex = foundTodoAtIndex -1 >= 0
        ? foundTodoAtIndex - 1
        : groupTodos.count() - 1;

    var newGroupTodos = listHelper.moveItem(groupTodos, foundTodoAtIndex, newTodoIndex),
        newGroup = foundGroup.set('todos', newGroupTodos);

    return currentState.set(foundGroupAtIndex, newGroup);
};

/**
 * @param {List} currentState
 *
 * @returns {List}
 *
 * @private
 */
var _handleSelectNextTodoGroupAction = function (currentState) {
    var [currentTodoGroup, currentTodoGroupIndex ] = _locateCurrentGroupInTodoGroupList(currentState);

    if (currentTodoGroup === null || currentTodoGroupIndex === null) {
        return _applyInitialSelection(currentState);
    }

    var nextTodoGroupIndex = currentState.has(currentTodoGroupIndex + 1) ? currentTodoGroupIndex + 1 : 0,
        nextTodoGroup = currentState.get(nextTodoGroupIndex);

    // deselect current todo group
    var newerState = currentState.set(
        currentTodoGroupIndex,
        _applyDeselectionOfAllTodosWithinTodoGroup(currentTodoGroup).set('isCurrent', false)
    );

    // select next todo group
    return newerState.set(
        nextTodoGroupIndex,
        _applySelectionOfFirstTodoWithinTodoGroup(nextTodoGroup).set('isCurrent', true)
    );
};

/**
 * @param {List} currentState
 *
 * @returns {List}
 *
 * @private
 */
var _handleSelectPreviousTodoGroupAction = function (currentState) {
    var [currentTodoGroup, currentTodoGroupIndex ] = _locateCurrentGroupInTodoGroupList(currentState);

    if (currentTodoGroup === null || currentTodoGroupIndex === null) {
        return _applyInitialSelection(currentState);
    }

    var previousTodoGroupIndex = currentState.has(currentTodoGroupIndex - 1) ? currentTodoGroupIndex - 1 : currentState.count() - 1,
        previousTodoGroup = currentState.get(previousTodoGroupIndex);

    // deselect current todo group
    var newerState = currentState.set(
        currentTodoGroupIndex,
        _applyDeselectionOfAllTodosWithinTodoGroup(currentTodoGroup).set('isCurrent', false)
    );

    // select next todo group
    return newerState.set(
        previousTodoGroupIndex,
        _applySelectionOfFirstTodoWithinTodoGroup(previousTodoGroup).set('isCurrent', true)
    );
};

/**
 * @param {List} todoGroupState
 *
 * @returns {List}
 *
 * @private
 */
var _applySelectionOfFirstTodoWithinTodoGroup = function (todoGroupState) {
    var todoGroupTodos = todoGroupState.get('todos');

    if (todoGroupTodos.count() === 0) {
        return todoGroupState;
    }

    var newTodoGroupTodos = todoGroupTodos.set(0, todoGroupTodos.get(0).set('isCurrent', true));

    return todoGroupState.set('todos', newTodoGroupTodos);
};

/**
 * @param {List} todoGroupState
 *
 * @returns {List}
 *
 * @private
 */
var _applyDeselectionOfAllTodosWithinTodoGroup = function (todoGroupState) {
    var todoGroupTodos = todoGroupState.get('todos');

    return todoGroupState.set('todos', todoGroupTodos.map(todo => todo.set('isCurrent', false)));
};

/**
 * @param {List} currentState
 *
 * @returns {List}
 *
 * @private
 */
var _applyInitialSelection = function (currentState) {
    var newerState = _selectTodoGroupWithIndex(currentState, 0),
        newerSelectedTodoGroup = newerState.get(0, null);

    if (newerSelectedTodoGroup === null) {
        return currentState;
    }

    var newSelectedTodoGroup = _selectTodoWithIndexInTodoGroup(newerSelectedTodoGroup, 0);

    return currentState.set(0, newSelectedTodoGroup);
};

/**
 * @param {Map} existingTodoGroupState
 * @param {Number} index
 *
 * @returns {Map|null}
 *
 * @private
 */
var _selectTodoWithIndexInTodoGroup = function (existingTodoGroupState, index) {
    var todoGroupTodos = existingTodoGroupState.get('todos'),
        foundTodo = todoGroupTodos.has(index) ? todoGroupTodos.get(index) : null;

    if (foundTodo === null) {
        // no todo found to select

        return existingTodoGroupState;
    }

    var newTodoGroupTodos = todoGroupTodos.set(index, foundTodo.set('isCurrent', true));

    return existingTodoGroupState.set('todos', newTodoGroupTodos);
};

/**
 * @param {List} currentState
 *
 * @returns {List}
 *
 * @private
 */
var _handleSelectNextTodoAction = function (currentState) {
    var [currentGroup, currentGroupIndex] = _locateCurrentGroupInState(currentState);

    if (currentGroup === null || currentGroupIndex === null) {
        return _applyInitialSelection(currentState);
    }

    var currentGroupTodos = currentGroup.get('todos'),
        [currentTodo, currentTodoIndex] = _locateCurrentTodoInListState(currentGroupTodos);

    if (currentTodo === null || currentTodoIndex === null) {
        return currentState.set(
            currentGroupIndex,
            _applySelectionOfFirstTodoWithinTodoGroup(currentGroup)
        );
    }

    var nextCurrentTodoIndex = currentGroupTodos.has(currentTodoIndex + 1)
        ? currentTodoIndex + 1
        : 0;

    // deselect current todo
    var newCurrentTodo = currentGroupTodos.get(currentTodoIndex).set('isCurrent', false),
        newerGroupTodos = currentGroupTodos.set(currentTodoIndex, newCurrentTodo);

    // select the new todo
    var nextCurrentTodo = newerGroupTodos.get(nextCurrentTodoIndex).set('isCurrent', true),
        nextGroupTodos = newerGroupTodos.set(nextCurrentTodoIndex, nextCurrentTodo);

    return currentState.set(currentGroupIndex, currentGroup.set('todos', nextGroupTodos));
};

/**
 * @param {List} currentState
 * @param {Number} index
 *
 * @returns {List}
 *
 * @private
 */
var _selectTodoGroupWithIndex = function (currentState, index) {
    var foundTodoGroup = currentState.get(index);

    if (!foundTodoGroup) {
        return currentState;
    }

    var newFoundTodoGroup = foundTodoGroup.set('isCurrent', true);

    return currentState.set(0, newFoundTodoGroup);
};

/**
 * @param {List} todoGroupList
 *
 * @returns {Array}
 *
 * @private
 */
var _locateCurrentGroupInTodoGroupList = function (todoGroupList) {
    var foundGroup = null,
        foundGroupAtIndex = null;

    todoGroupList.map(function (group, index) {
        if (group.get('isCurrent', false) === true) {
            foundGroup = group;
            foundGroupAtIndex = index;
        }
    });

    return [foundGroup, foundGroupAtIndex];
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handleTodoSortUpdate = function (currentState, action) {
    var [ fromGroup, fromGroupIndex ] = _locateGroupInState(action.fromGroupCid, currentState);

    if (fromGroup === null || fromGroupIndex === null) {
        return currentState;
    }

    if (action.fromGroupCid === action.toGroupCid) {

        var newFromGroupTodos = listHelper.moveItem(fromGroup.get('todos'), action.fromIndex, action.toIndex),
            newFromGroup = fromGroup.set('todos', newFromGroupTodos);

        return currentState.set(fromGroupIndex, newFromGroup)
    } else {

        // remove from first group
        var fromGroupTodos = fromGroup.get('todos'),
            todo = fromGroupTodos.get(action.fromIndex);

        if (!todo) {
            return currentState;
        }

        newFromGroupTodos = fromGroupTodos.splice(action.fromIndex, 1);
        newFromGroup = fromGroup.set('todos', newFromGroupTodos);

        var newState = currentState.set(fromGroupIndex, newFromGroup);

        // add to new group
        var [ toGroup, toGroupIndex ] = _locateGroupInState(action.toGroupCid, currentState);

        if (toGroup === null || toGroupIndex === null) {
            return currentState;
        }

        var toGroupTodos = toGroup.get('todos'),
            newToGroupTodos = listHelper.addItem(toGroupTodos, todo, action.toIndex),
            newToGroup = toGroup.set('todos', newToGroupTodos);

        return newState.set(toGroupIndex, newToGroup);
    }
};

/**
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handleMoveTodoDownAction = function (currentState, action) {
    var [ foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.groupCid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var groupTodos = foundGroup.get('todos'),
        [ foundTodo, foundTodoAtIndex ] = _locateTodoInListState(action.cid, groupTodos);

    if (foundTodo === null || foundTodoAtIndex === null) {
        return currentState;
    }

    var newTodoIndex = foundTodoAtIndex + 1 <= groupTodos.count() - 1
        ? foundTodoAtIndex + 1
        : 0;

    var newGroupTodos = listHelper.moveItem(groupTodos, foundTodoAtIndex, newTodoIndex),
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
var _handleMoveTodoGroupForwardAction = function (currentState, action) {
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
var _handleMoveTodoGroupBackwardsAction = function (currentState, action) {
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
 * @param {List} currentState
 * @param {Object} action
 *
 * @returns {List}
 *
 * @private
 */
var _handleUpdateGroupStarredStatus = function (currentState, action) {
    var [foundGroup, foundGroupAtIndex ] = _locateGroupInState(action.cid, currentState);

    if (foundGroup === null || foundGroupAtIndex === null) {
        return currentState;
    }

    var newGroup = foundGroup.set('isStarred', action.newStatus);

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
 * @param {List} todoGroupListState
 *
 * @returns {Array}
 *
 * @private
 */
var _locateCurrentGroupInState = function (todoGroupListState) {
    var foundGroup = null,
        foundGroupAtIndex = null;

    todoGroupListState.map(function (group, index) {
        if (group.get('isCurrent', false) === true) {
            foundGroup = group;
            foundGroupAtIndex = index;
        }
    });

    return [foundGroup, foundGroupAtIndex];
};

/**
 * @param {String} cid
 * @param {List} todoGroupListState
 *
 * @returns {Array|null}
 *
 * @private
 */
var _locateGroupInState = function (cid, todoGroupListState) {
    var foundGroup = null,
        foundGroupAtIndex = null;

    todoGroupListState.map(function (group, index) {
        if (group.get('cid') === cid) {
            foundGroup = group;
            foundGroupAtIndex = index;
        }
    });

    return [foundGroup, foundGroupAtIndex];
};

/**
 * @param {List} todoListState
 *
 * @return {Array}
 *
 * @private
 */
var _locateCurrentTodoInListState = function (todoListState) {
    var foundTodo = null,
        foundTodoAtIndex = null;

    todoListState.map(function (todo, index) {
        if (todo.get('isCurrent', false) === true) {
            foundTodo = todo;
            foundTodoAtIndex = index;
        }
    });

    return [ foundTodo, foundTodoAtIndex ];
};

/**
 * @param {String} cid
 * @param {List} todoListState
 *
 * @returns {Array}
 *
 * @private
 */
var _locateTodoInListState = function (cid, todoListState) {
    var foundTodo = null,
        foundTodoAtIndex = null;

    todoListState.map(function (todo, index) {
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
            return _handleMoveTodoGroupForwardAction(currentState, action);

        case actionTypes.MOVE_TODO_GROUP_BACKWARDS:
            return _handleMoveTodoGroupBackwardsAction(currentState, action);

        case actionTypes.MOVE_TODO_UP:
            return _handleMoveTodoUpAction(currentState, action);

        case actionTypes.MOVE_TODO_DOWN:
            return _handleMoveTodoDownAction(currentState, action);

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

        default:
            return currentState;
    }
};
