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
     */
    render() {
        return (
            <div>
                <div className="checkbox">
                    <a href="#" className="pull-right" onClick={this._onTodoDeleteClick.bind(this)}>x</a>
                    <label>
                        <input type="checkbox"
                               onChange={this._onIsCompletedChange.bind(this)}
                               checked={this.props.isCompleted} /> {this.props.title}
                    </label>
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
