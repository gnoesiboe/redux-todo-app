import React from 'react';
import TodoDeadlineComponent from './TodoDeadlineComponent';
import TodoTitleComponent from './TodoTitleComponent';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoComponent extends React.Component {

    /**
     * @param {Object} event
     *
     * @private
     */
    _onIsCompletedChange(event) {
        this.props.onTodoCompletedStatusChange(this.props.cid, !this.props.isCompleted);

        // blur checkbox to immediately allow client to use undo if wanted. Default behaviour of browser is
        // focus on checkbox field, which does not allow the key bindings
        event.target.blur();
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onTodoDeleteClick(event) {
        event.preventDefault();

        if (confirm('Are you sure?')) {
            this.props.onTodoDelete(this.props.cid);
        }
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onSwitchToEditModeClick(event) {
        event.preventDefault();

        this.props.onSwitchTodoDisplayMode(this.props.cid);
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onToggleIsStarredClick(event) {
        event.preventDefault();

        this.props.onToggleTodoIsStarredStatus(this.props.cid);
    }

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderViewActions() {
        return (
            <ul className="list-inline todo-component-actions">
                <li>
                    <a href="#"
                       className="todo-component-action js-tooltip"
                       onClick={this._onToggleIsStarredClick.bind(this)}
                       title="Mark as more important">
                        <i className="glyphicon glyphicon-star" />
                    </a>
                </li>
                <li className="todo-component-action-seperator">|</li>
                <li>
                    <a href="#"
                       className="todo-component-action js-tooltip"
                       title="Edit"
                       onClick={this._onSwitchToEditModeClick.bind(this)}>
                        <i className="glyphicon glyphicon-pencil" />
                    </a>
                </li>
                <li className="todo-component-action-seperator">|</li>
                <li>
                    <a href="#"
                       onClick={this._onTodoDeleteClick.bind(this)}
                       title="Remove"
                       className="todo-component-action js-tooltip">
                        <i className="glyphicon glyphicon-remove" />
                    </a>
                </li>
            </ul>
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        var className = 'todo-component' +
            (this.props.isCompleted ? ' todo-component--is-completed' : '') +
            (this.props.isCurrent ? ' todo-component--is-current' : '');

        return (
            <div className={className}>
                <div className="checkbox">
                    {this._renderViewActions()}

                    <label>
                        <input type="checkbox"
                               onChange={this._onIsCompletedChange.bind(this)}
                               checked={this.props.isCompleted} />

                        <TodoDeadlineComponent value={this.props.deadline}
                                               isCompleted={this.props.isCompleted} />

                        <TodoTitleComponent title={this.props.title} />
                    </label>
                </div>
            </div>
        );
    }
}

TodoComponent.defaultProps = {
    isCompleted: false,
    isCurrent: false,
    isStarred: false
};

TodoComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    isCompleted: React.PropTypes.bool,
    isCurrent: React.PropTypes.bool,
    isStarred: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    deadline: React.PropTypes.string,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onSwitchTodoDisplayMode: React.PropTypes.func.isRequired,
    onToggleTodoIsStarredStatus: React.PropTypes.func.isRequired,
};

export default TodoComponent;
