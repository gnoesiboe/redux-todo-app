import React from 'react';

const MODE_EDIT = 'EDIT';
const MODE_VIEW = 'VIEW';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoGroupTitleComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this.state = this._getResetState();
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    _getResetState() {
        return {
            mode: MODE_VIEW,
            title: this.props.title
        };
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onEditLinkClick(event) {

        // prevent the browser from following the link
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
            <div className="todo-group-title-component">
                <h3 className="todo-group-title-component-title">
                    { this.state.title }
                    <a href="#" className="todo-group-title-component-edit-link" onClick={this._onEditLinkClick.bind(this)}>
                        <i className="glyphicon glyphicon-edit" />
                    </a>
                </h3>
            </div>
        );
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onFormFieldChange(event) {
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

        // prevent backend submission
        event.preventDefault();

        this.props.onTodoGroupTitleEdit(this.state.title);

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
            <div className="todo-group-title-component">
                <form className="form" action="#" onSubmit={this._onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               onChange={this._onFormFieldChange.bind(this)}
                               placeholder="Title.."
                               value={this.state.title}
                               name="title" />
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
                throw new Error(`Mode '${this.state.mode}' not supported!`);
        }
    }
}

TodoGroupTitleComponent.propTypes = {
    title: React.PropTypes.string.isRequired,
    onTodoGroupTitleEdit: React.PropTypes.func.isRequired
};

export default TodoGroupTitleComponent;
