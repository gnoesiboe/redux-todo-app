import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoGroupActionsComponent extends React.Component {

    /**
     * @param {Object} event
     *
     * @private
     */
    _onRemoveClick(event) {

        // prevent browser from following link
        event.preventDefault();

        if (confirm('Are you sure? You will delete it\'s todos to!')) {
            this.props.onTodoGroupDelete(this.props.cid);
        }
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-group-actions-component">
                <div className="row">
                    <div className="col-xs-3">
                        <a href="#">
                            <i className="glyphicon glyphicon-menu-left" />
                        </a>
                    </div>
                    <div className="col-xs-6 text-center">
                        <a href="#" onClick={this._onRemoveClick.bind(this)}>
                            remove
                        </a>
                    </div>
                    <div className="col-xs-3 text-right">
                        <a href="#">
                            <i className="glyphicon glyphicon-menu-right" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

TodoGroupActionsComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    onTodoGroupDelete: React.PropTypes.func.isRequired
};

export default TodoGroupActionsComponent;
