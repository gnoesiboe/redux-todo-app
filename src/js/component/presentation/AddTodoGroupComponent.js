import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class AddTodoGroupComponent extends React.Component {

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
            title: null
        };
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onFormFieldValueChange(event) {
        var domElement = event.target;

        this.setState({
            [domElement.name]: domElement.value
        });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onFormSubmit(event) {

        // prevent backend form submission
        event.preventDefault();

        this.props.onAddTodoGroup(this.state.title);

        this._resetFormFields();
    }

    /**
     * @private
     */
    _resetFormFields() {
        this.setState(this._getResetState());
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="add-todo-group-component">
                <h3>Add todo group</h3>
                <form action="" className="form" onSubmit={this._onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="group-name-input" className="control-label">Title</label>
                        <input type="text"
                               id="group-name-input"
                               name="title"
                               value={this.state.title}
                               className="form-control"
                               onChange={this._onFormFieldValueChange.bind(this)} />
                    </div>
                    <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        );
    }
}

AddTodoGroupComponent.propTypes = {
    onAddTodoGroup: React.PropTypes.func.isRequired
};

export default AddTodoGroupComponent;
