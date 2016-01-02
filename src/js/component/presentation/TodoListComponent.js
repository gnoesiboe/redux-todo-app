import React from 'react';
import TodoComponent from './TodoComponent';
import EditTodoComponent from './EditTodoComponent';
import SortableListComponent from './SortableListComponent';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoListComponent extends React.Component {

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderTodos() {
        return this.props.todos.map(function (todo, index) {

            // As, when todo's are re-ordered, the keys are named differently (their index changes), react will
            // re-render them accordingly. If the index is not part of the key, this list will contain the same
            // items but in another order, so react won't re-render (and thus not show the change) :(
            let key = `${index}_${this.props.groupCid}_${todo.get('cid')}`;

            let className = 'js-todo-list-component-list-item list-group-item' + (todo.get('isCurrent') ? ' todo-list-component-list-item--is-current' : '');

            return (
                <li key={key} className={className}>
                    {this._defineTodoDisplayComponent(todo)}
                </li>
            );
        }.bind(this));
    }

    /**
     * @param {Todo} todo
     *
     * @returns {XML}
     *
     * @private
     */
    _defineTodoDisplayComponent(todo) {
        if (todo.get('isBeingEdited', false)) {
            return (
                <EditTodoComponent cid={todo.get('cid')}
                                   title={todo.get('title')}
                                   deadline={todo.get('deadline')}
                                   onTodoEdit={this.props.onTodoEdit} />
            );
        } else {
            return (
                <TodoComponent cid={todo.get('cid')}
                               title={todo.get('title')}
                               deadline={todo.get('deadline')}
                               onTodoDelete={this.props.onTodoDelete}
                               onSwitchTodoDisplayMode={this.props.onSwitchTodoDisplayMode}
                               onTodoCompletedStatusChange={this.props.onTodoCompletedStatusChange}
                               isCompleted={todo.get('isCompleted')}
                               onToggleTodoIsStarredStatus={this.props.onToggleTodoIsStarredStatus}
                               isCurrent={todo.get('isCurrent')}
                               isStarred={todo.get('isStarred')}/>
            );
        }
    }

    /**
     * @param {String} fromGroupCid
     * @param {String} toGroupCid
     * @param {String} fromIndex
     * @param {String} toIndex
     *
     * @private
     */
    _onSortUpdate(fromGroupCid, toGroupCid, fromIndex, toIndex) {
        this.props.onTodoSortUpdate(fromGroupCid, toGroupCid, fromIndex, toIndex);
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-list-component">
                <SortableListComponent className="todo-list-component-list list-group"
                                       draggableClassName=".js-todo-list-component-list-item"
                                       sortGroup="todo-list"
                                       onUpdate={this._onSortUpdate.bind(this)}
                                       sortGroupIdentifier={this.props.groupCid}>

                    {this._renderTodos()}
                </SortableListComponent>
            </div>
        );
    }
}

TodoListComponent.propTypes = {
    groupCid: React.PropTypes.string.isRequired,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    todos: React.PropTypes.object.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onTodoEdit: React.PropTypes.func.isRequired,
    onSwitchTodoDisplayMode: React.PropTypes.func.isRequired,
    onTodoSortUpdate: React.PropTypes.func.isRequired,
    onToggleTodoIsStarredStatus: React.PropTypes.func.isRequired
};

export default TodoListComponent;
