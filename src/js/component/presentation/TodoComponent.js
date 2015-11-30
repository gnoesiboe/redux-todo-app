import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoComponent extends React.Component {

    /**
     * @param {Object} event
     *
     * @private
     */
    _onIsCompletedChange(event) {
        this.props.onTodoCompletedStatusChange(this.props.cid, !this.props.isCompleted);
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <div className="checkbox">
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
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired
};

export default TodoComponent;
