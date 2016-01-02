import React from 'react';
import TodoListComponent from './TodoListComponent';
import AddTodoComponent from './AddTodoComponent';
import TodoGroupTitleComponent from './TodoGroupTitleComponent';
import TodoGroupActionsComponent from './TodoGroupActionsComponent';

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
     * @param {String} newDeadline
     *
     * @private
     */
    _onTodoEdit(todoCid, newTodoTitle, newDeadline) {

        // add our group cid to the callback, to apply context
        this.props.onTodoEdit(todoCid, newTodoTitle, newDeadline, this.props.cid);
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
     * @param {String} todoCid
     *
     * @private
     */
    _onTodoMoveUp(todoCid) {
        this.props.onTodoMoveUp(todoCid, this.props.cid);
    }

    /**
     * @param {String} todoCid
     *
     * @private
     */
    _onTodoMoveDown(todoCid) {
        this.props.onTodoMoveDown(todoCid, this.props.cid);
    }

    /**
     * @param {String} todoCid
     *
     * @private
     */
    _onSwitchTodoDisplayMode(todoCid) {
        this.props.onSwitchTodoDisplayMode(todoCid, this.props.cid);
    }

    /**
     * @param {String} todoCid
     *
     * @private
     */
    _onToggleTodoIsStarredStatus(todoCid) {
        this.props.onToggleTodoIsStarredStatus(todoCid, this.props.cid);
    }

    /**
     * @returns {XML}
     */
    render() {
        var className = 'todo-group-component' +
            (this.props.isStarred ? ' todo-group-component--is-starred' : '') +
            (this.props.isCurrent ? ' todo-group-component--is-current' : '');

        return (
            <div className={className} data-match-height="js-container-block">
                <div className="todo-group-component-body">
                    <TodoGroupTitleComponent title={this.props.title}
                                             isStarred={this.props.isStarred}
                                             onTodoGroupTitleEdit={this._onTodoGroupTitleEdit.bind(this)} />

                    <TodoListComponent todos={this.props.todos}
                                       groupCid={this.props.cid}
                                       onTodoDelete={this._onTodoDelete.bind(this)}
                                       onTodoEdit={this._onTodoEdit.bind(this)}
                                       onSwitchTodoDisplayMode={this._onSwitchTodoDisplayMode.bind(this)}
                                       onTodoSortUpdate={this.props.onTodoSortUpdate}
                                       onToggleTodoIsStarredStatus={this._onToggleTodoIsStarredStatus.bind(this)}
                                       onTodoCompletedStatusChange={this._onTodoCompletedStatusChange.bind(this)} />
                </div>
                <div className="todo-group-component-footer">
                    <AddTodoComponent onAddTodo={this._onAddTodo.bind(this)}
                                      allowAddWithKeybinding={this.props.isCurrent}>

                        <TodoGroupActionsComponent cid={this.props.cid}
                                                   isStarred={this.props.isStarred}
                                                   onTodoGroupDelete={this.props.onTodoGroupDelete}
                                                   onTodoGroupMoveBackwards={this.props.onTodoGroupMoveBackwards}
                                                   allowMoveBackwards={this.props.allowMoveBackwards}
                                                   allowMoveForward={this.props.allowMoveForward}
                                                   onGroupStarredStatusChange={this.props.onGroupStarredStatusChange}
                                                   onTodoGroupMoveForward={this.props.onTodoGroupMoveForward}/>
                    </AddTodoComponent>
                </div>
            </div>
        );
    }
}

TodoGroupComponent.defaultProps = {
    isCurrent: false,
    isStarred: false
};

TodoGroupComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    isStarred: React.PropTypes.bool,
    isCurrent: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    todos: React.PropTypes.object.isRequired,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    onAddTodo: React.PropTypes.func.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onTodoEdit: React.PropTypes.func.isRequired,
    onTodoGroupTitleEdit: React.PropTypes.func.isRequired,
    onTodoGroupDelete: React.PropTypes.func.isRequired,
    onTodoGroupMoveForward: React.PropTypes.func.isRequired,
    onTodoGroupMoveBackwards: React.PropTypes.func.isRequired,
    onGroupStarredStatusChange: React.PropTypes.func.isRequired,
    allowMoveBackwards: React.PropTypes.bool.isRequired,
    allowMoveForward: React.PropTypes.bool.isRequired,
    onTodoSortUpdate: React.PropTypes.func.isRequired,
    onSwitchTodoDisplayMode: React.PropTypes.func.isRequired,
    onToggleTodoIsStarredStatus: React.PropTypes.func.isRequired
};

export default TodoGroupComponent;
