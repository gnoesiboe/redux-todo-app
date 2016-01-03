import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const MODE_CREATE = 'CREATE';
const MODE_VIEW = 'VIEW';

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
            mode: MODE_VIEW,
            title: null,
            submitAllowed: false
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

        this._resetSubmitStatus();
    }

    /**
     * @private
     */
    _resetSubmitStatus() {
        this.setState({
            submitAllowed: this._hasValidInput()
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

        if (!this._hasValidInput()) {
            return;
        }

        this.props.onAddTodoGroup(this.state.title);

        this._resetFormFields();
    }

    /**
     * @returns {Boolean}
     *
     * @private
     */
    _hasValidInput() {
        return _.isString(this.state.title) && this.state.title.length > 0;
    }

    /**
     * @private
     */
    _resetFormFields() {
        this.setState(this._getResetState());
    }

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderCreateMode() {
        return (
            <div className="add-todo-group-component"
                 data-match-height="js-container-block">

                <form action="" className="form" onSubmit={this._onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text"
                               id="group-name-input"
                               name="title"
                               ref="title"
                               placeholder="Title.."
                               value={this.state.title}
                               className="form-control"
                               onChange={this._onFormFieldValueChange.bind(this)} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-success" disabled={!this._hasValidInput()}>Add group</button>
                    </div>
                </form>
            </div>
        );
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onAddLinkClick(event) {

        // prevent follow link href
        event.preventDefault();

        this.setState({
            mode: MODE_CREATE
        }, this._focusTitleField.bind(this));
    }

    /**
     * @private
     */
    _focusTitleField() {
        ReactDOM.findDOMNode(this.refs.title).focus();
    }

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderViewMode() {
        return (
            <div className="add-todo-group-component text-center"
                 data-match-height="js-container-block">

                <a href="#" className="add-todo-group-component-add-link" onClick={this._onAddLinkClick.bind(this)}>+</a>
            </div>
        )
    }

    /**
     * @returns {XML}
     */
    render() {
        switch (this.state.mode) {
            case MODE_VIEW:
                return this._renderViewMode();

            case MODE_CREATE:
                return this._renderCreateMode();
        }
    }
}

AddTodoGroupComponent.propTypes = {
    onAddTodoGroup: React.PropTypes.func.isRequired
};

export default AddTodoGroupComponent;
