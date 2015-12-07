import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoComponent extends React.Component {

    /**
     * @private
     */
    _onIsCompletedChange() {
        this.props.onTodoCompletedStatusChange(this.props.cid, !this.props.isCompleted);
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
     * @returns {XML}
     *
     * @private
     */
    _renderActionsList() {
        return (
            <ul className="list-inline todo-component-actions">
                <li>
                    <a href="#" className="todo-component-action">
                        edit
                    </a>
                </li>
                <li className="todo-component-action-seperator">|</li>
                <li>
                    <a href="#" onClick={this._onTodoDeleteClick.bind(this)} className="todo-component-action">
                        remove
                    </a>
                </li>
            </ul>
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-component">
                <div className="checkbox">
                    <label>
                        <input type="checkbox"
                               onChange={this._onIsCompletedChange.bind(this)}
                               checked={this.props.isCompleted} /> {this.props.title}
                    </label>
                    {this._renderActionsList()}
                </div>
            </div>
        );
    }
}

TodoComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    isCompleted: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired
};

export default TodoComponent;
