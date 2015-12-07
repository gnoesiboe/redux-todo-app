import React from 'react';
import TodoComponent from './TodoComponent';

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
                <li key={key}>
                    <TodoComponent cid={todo.get('cid')}
                                   title={todo.get('title')}
                                   onTodoDelete={this.props.onTodoDelete}
                                   onTodoEdit={this.props.onTodoEdit}
                                   onTodoCompletedStatusChange={this.props.onTodoCompletedStatusChange}
                                   isCompleted={todo.get('isCompleted')} />
                </li>
            );
        }.bind(this));
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-list-component">
                <ul className="todo-list-component-list">
                    {this._renderTodos()}
                </ul>
            </div>
        );
    }
}

TodoListComponent.propTypes = {
    groupCid: React.PropTypes.string.isRequired,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    todos: React.PropTypes.object.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onTodoEdit: React.PropTypes.func.isRequired
};

export default TodoListComponent;
