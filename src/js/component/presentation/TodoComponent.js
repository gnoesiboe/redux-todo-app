import React from 'react';
import ReactDOM from 'react-dom';
import TodoDeadlineComponent from './TodoDeadlineComponent';
import { markdown } from 'markdown';

const MODE_EDIT = 'MODE_EDIT';
const MODE_VIEW = 'MODE_VIEW';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = this._getDefaultState();
    }

    /**
     * @inheritDoc
     */
    componentDidUpdate() {
        if (this.state.mode === MODE_EDIT) {
            this._focusTitleField();
        }
    }

    /**
     * @private
     */
    _focusTitleField() {
        ReactDOM.findDOMNode(this.refs.title).focus();
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    _getDefaultState() {
        return {
            mode: MODE_VIEW,
            title: this.props.title,
            deadline: this.props.deadline
        };
    }

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
    _onTodoEditClick(event) {
        event.preventDefault();

        this.setState({
            mode: MODE_EDIT
        });
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
                    <a href="#" className="todo-component-action" onClick={this._onTodoEditClick.bind(this)}>
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
     *
     * @private
     */
    _renderViewMode() {
        var className = 'todo-component' + (this.props.isCompleted ? ' todo-component--is-completed' : '');

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

    /**
     * @param {Object} event
     *
     * @private
     */
    _onFieldChange(event) {
        var field = event.target;

        this.setState({
            [field.name]: field.value
        });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onFormSubmit(event) {

        // prevent packend submission
        event.preventDefault();

        this.props.onTodoEdit(this.props.cid, this.state.title, this.state.deadline);

        this.setState({
            mode: MODE_VIEW
        });
    }

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderEditMode() {
        return (
            <div className="todo-component">
                <form className="form" className="todo-component-form" onSubmit={this._onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <label className="control-label">Title</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Title.."
                               onChange={this._onFieldChange.bind(this)}
                               name="title"
                               ref="title"
                               value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Deadline</label>
                        <input type="date"
                               className="form-control"
                               placeholder="Deadline.."
                               onChange={this._onFieldChange.bind(this)}
                               name="deadline"
                               value={this.state.deadline} />
                    </div>
                    <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        switch (this.state.mode) {
            case MODE_VIEW:
                return this._renderViewMode();

            case MODE_EDIT:
                return this._renderEditMode();

            default:
                throw new Error(`State ${this.state.mode} not supported`);
        }
    }
}

TodoComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    isCompleted: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string.isRequired,
    deadline: React.PropTypes.string,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onTodoEdit: React.PropTypes.func.isRequired
};

export default TodoComponent;
