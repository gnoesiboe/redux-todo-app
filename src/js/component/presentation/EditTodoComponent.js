import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class EditTodoComponent extends React.Component {

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
    componentDidMount() {
        this._focusTitleField();
    }

    /**
     * @returns {Object}
     *
     * @private
     */
    _getDefaultState() {
        return {
            title: this.props.title,
            deadline: this.props.deadline
        };
    }

    /**
     * @private
     */
    _focusTitleField() {
        ReactDOM.findDOMNode(this.refs.title).focus();
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
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-component">
                <form className="form" className="todo-component-form" onSubmit={this._onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <label className="control-label">Title</label>
                        <textarea className="form-control"
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
}

EditTodoComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    deadline: React.PropTypes.string,
    onTodoEdit: React.PropTypes.func.isRequired
};

export default EditTodoComponent;
