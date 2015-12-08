import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class AddTodoComponent extends React.Component {

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
    _onFieldChange(event) {
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

        // prevent backend submission
        event.preventDefault();

        var title = this.state.title;

        if (title.length === 0) {
            return;
        }

        this.props.onAddTodo(title);

        this._resetForm();
    }

    /**
     * @private
     */
    _resetForm() {
        this.setState(this._getResetState());
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="add-todo-component">
                <form action="#" onSubmit={this._onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text"
                               placeholder="Add todo.."
                               name="title"
                               value={this.state.title}
                               className="form-control"
                               onChange={this._onFieldChange.bind(this)}/>
                    </div>
                </form>

                {this.props.children}
            </div>
        );
    }
}

AddTodoComponent.propTypes = {
    onAddTodo: React.PropTypes.func.isRequired
};

export default AddTodoComponent;
