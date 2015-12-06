import React from 'react';
import TodoListComponent from './TodoListComponent';
import AddTodoComponent from './AddTodoComponent';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoGroupComponent extends React.Component {

    /**
     * @param {String} cid
     * @param {Boolean} newIsCompleted
     *
     * @private
     */
    _onTodoCompletedStatusChange(cid, newIsCompleted) {
        this.props.onTodoCompletedStatusChange(cid, newIsCompleted, this.props.cid);
    }

    /**
     * @param {String} title
     *
     * @private
     */
    _onAddTodo(title) {
        this.props.onAddTodo(title, this.props.cid);
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-group-component">
                <h3 className="todo-group-component-title">{ this.props.title }</h3>
                <TodoListComponent todos={this.props.todos}
                                   groupCid={this.props.cid}
                                   onTodoCompletedStatusChange={this._onTodoCompletedStatusChange.bind(this)} />
                <AddTodoComponent onAddTodo={this._onAddTodo.bind(this)} />
            </div>
        );
    }
}

TodoGroupComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    todos: React.PropTypes.object.isRequired,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    onAddTodo: React.PropTypes.func.isRequired
};

export default TodoGroupComponent;
