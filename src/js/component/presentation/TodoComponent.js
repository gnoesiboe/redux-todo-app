import React from 'react';

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
     * @returns {Object}
     *
     * @private
     */
    _getDefaultState() {
        return {
            mode: MODE_VIEW,
            title: this.props.title
        };
    }

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
    _renderViewMode() {
        return (
            <div className="todo-component">
                <div className="checkbox">
                    <label>
                        <input type="checkbox"
                               onChange={this._onIsCompletedChange.bind(this)}
                               checked={this.props.isCompleted} /> {this.props.title}
                    </label>
                    <ul className="list-inline todo-component-actions">
                        <li>
                            <a href="#" className="todo-component-action" onClick={this._onTodoEditClick.bind(this)}>
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

        this.props.onTodoEdit(this.props.cid, this.state.title);

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
                <form className="form" onSubmit={this._onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <label>
                            <input type="text"
                                   className="form-control"
                                   placeholder="Title.."
                                   onChange={this._onFieldChange.bind(this)}
                                   name="title"
                                   value={this.state.title} />
                        </label>
                    </div>
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
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    onTodoDelete: React.PropTypes.func.isRequired,
    onTodoEdit: React.PropTypes.func.isRequired
};

export default TodoComponent;
