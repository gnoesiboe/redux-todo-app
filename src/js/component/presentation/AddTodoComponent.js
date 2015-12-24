import React from 'react';
import mousetrap from 'mousetrap';
import ReactDOM from 'react-dom';

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

        this._onAddKeybindingPressedCallback = this._onAddKeybindingPressed.bind(this);
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        if (this.props.allowAddWithKeybinding) {
            this._registerAddKeybindingEventIfNeeded();
        }
    }

    /**
     * @inheritDoc
     */
    componentDidUpdate() {
        if (this.props.allowAddWithKeybinding) {
            this._registerAddKeybindingEventIfNeeded();
        } else {
            this._unregisterAddKeybindingEventIfNeeded();
        }
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        this._unregisterAddKeybindingEventIfNeeded();
    }

    /**
     * @private
     */
    _registerAddKeybindingEventIfNeeded() {
        console.log('register');

        mousetrap.bind('a', this._onAddKeybindingPressedCallback);
    }

    /**
     * @private
     */
    _unregisterAddKeybindingEventIfNeeded() {
        console.log('unregister');

        mousetrap.unbind('a', this._onAddKeybindingPressedCallback);
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onAddKeybindingPressed(event) {

        // prevent browser from typing the key binding into the add todo field
        event.preventDefault();

        this._focusTitleField();
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
                               ref="title"
                               onChange={this._onFieldChange.bind(this)}/>
                    </div>
                </form>

                {this.props.children}
            </div>
        );
    }
}

AddTodoComponent.defaultProps = {
    allowAddWithKeybinding: false
};

AddTodoComponent.propTypes = {
    onAddTodo: React.PropTypes.func.isRequired,
    allowAddWithKeybinding: React.PropTypes.bool.isRequired
};

export default AddTodoComponent;
