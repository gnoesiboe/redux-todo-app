import React from 'react';
import TodoComponent from './TodoComponent';
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
        return this.props.todos.map(function (todo) {
            let key = this.props.groupCid + '_' + todo.get('cid');

            return (
                <li key={key}
                    className="js-todo-list-component-list-item">
                    <TodoComponent cid={todo.get('cid')}
                                   title={todo.get('title')}
                                   deadline={todo.get('deadline')}
                                   onTodoDelete={this.props.onTodoDelete}
                                   onTodoEdit={this.props.onTodoEdit}
                                   onTodoCompletedStatusChange={this.props.onTodoCompletedStatusChange}
                                   onTodoMoveUp={this.props.onTodoMoveUp}
                                   onTodoMoveDown={this.props.onTodoMoveDown}
                                   isCompleted={todo.get('isCompleted')} />
                </li>
            );
        }.bind(this));
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
                <SortableListComponent className="todo-list-component-list"
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
    onTodoMoveUp: React.PropTypes.func.isRequired,
    onTodoMoveDown: React.PropTypes.func.isRequired,
    onTodoSortUpdate: React.PropTypes.func.isRequired
};

export default TodoListComponent;
