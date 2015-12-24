import React from 'react';
import TodoDeadlineComponent from './TodoDeadlineComponent';
import { markdown } from 'markdown';

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
     * @returns {XML}
     *
     * @private
     */
    _renderViewActions() {
        return (
            <ul className="list-inline todo-component-actions">
                <li>
                    <a href="#" className="todo-component-action" onClick={this._onSwitchToEditModeClick.bind(this)}>
                        <i className="glyphicon glyphicon-pencil" />
                    </a>
                </li>
                <li className="todo-component-action-seperator">|</li>
                <li>
                    <a href="#" onClick={this._onTodoDeleteClick.bind(this)} className="todo-component-action">
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
                        <span className="todo-component-title"
                              dangerouslySetInnerHTML={{ __html: markdown.toHTML(this.props.title) }} />
                    </label>
                </div>
            </div>
        );
    }
}

TodoComponent.defaultProps = {
    isCompleted: false,
    isCurrent: false
};

TodoComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    isCompleted: React.PropTypes.bool,
    isCurrent: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired,
    deadline: React.PropTypes.string,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onSwitchTodoDisplayMode: React.PropTypes.func.isRequired
};

export default TodoComponent;
