import React from 'react';
import TodoListComponent from './TodoListComponent';
import AddTodoComponent from './AddTodoComponent';
import TodoGroupTitleComponent from './TodoGroupTitleComponent';

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

        // add our group cid to the callback, to apply context
        this.props.onAddTodo(title, this.props.cid);
    }

    /**
     * @param {String} todoCid
     *
     * @private
     */
    _onTodoDelete(todoCid) {

        // add our group cid to the callback, to apply context
        this.props.onTodoDelete(todoCid, this.props.cid);
    }

    /**
     * @param {String} todoCid
     * @param {String} newTodoTitle
     *
     * @private
     */
    _onTodoEdit(todoCid, newTodoTitle) {

        // add our group cid to the callback, to apply context
        this.props.onTodoEdit(todoCid, newTodoTitle, this.props.cid);
    }

    /**
     * @param {String} newTitle
     *
     * @private
     */
    _onTodoGroupTitleEdit(newTitle) {
        this.props.onTodoGroupTitleEdit(this.props.cid, newTitle);
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-group-component">
                <TodoGroupTitleComponent title={this.props.title}
                                         onTodoGroupTitleEdit={this._onTodoGroupTitleEdit.bind(this)} />
                <TodoListComponent todos={this.props.todos}
                                   groupCid={this.props.cid}
                                   onTodoDelete={this._onTodoDelete.bind(this)}
                                   onTodoEdit={this._onTodoEdit.bind(this)}
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
    onAddTodo: React.PropTypes.func.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onTodoEdit: React.PropTypes.func.isRequired,
    onTodoGroupTitleEdit: React.PropTypes.func.isRequired
};

export default TodoGroupComponent;
