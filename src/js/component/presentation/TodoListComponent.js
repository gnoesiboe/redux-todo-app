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
    todos: React.PropTypes.object.isRequired
};

export default TodoListComponent;
