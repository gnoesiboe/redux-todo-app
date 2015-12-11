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
     * @param {Object} event
     *
     * @private
     */
    _onMoveForwardClick(event) {

        // prevent browser from following link href
        event.preventDefault();

        this.props.onTodoGroupMoveForward(this.props.cid);
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onMoveBackwardsClick(event) {

        // prevent browser from following link href
        event.preventDefault();

        this.props.onTodoGroupMoveBackwards(this.props.cid);
    }

    /**
     * @returns {XML|null}
     *
     * @private
     */
    _renderMoveBackwards() {
        if (this.props.allowMoveBackwards) {
            return (
                <a href="#" onClick={this._onMoveBackwardsClick.bind(this)}>
                    <i className="glyphicon glyphicon-menu-left" />
                </a>
            );
        } else {
            return null;
        }
    }

    /**
     * @returns {XML|null}
     *
     * @private
     */
    _renderMoveForwards() {
        if (this.props.allowMoveForward) {
            return (
                <a href="#" onClick={this._onMoveForwardClick.bind(this)}>
                    <i className="glyphicon glyphicon-menu-right" />
                </a>
            );
        } else {
            return null;
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
                        {this._renderMoveBackwards()}
                    </div>
                    <div className="col-xs-6 text-center">
                        <a href="#" onClick={this._onRemoveClick.bind(this)}>
                            remove
                        </a>
                    </div>
                    <div className="col-xs-3 text-right">
                        {this._renderMoveForwards()}
                    </div>
                </div>
            </div>
        );
    }
}

TodoGroupActionsComponent.propTypes = {
    cid: React.PropTypes.string.isRequired,
    onTodoGroupDelete: React.PropTypes.func.isRequired,
    onTodoGroupMoveForward: React.PropTypes.func.isRequired,
    onTodoGroupMoveBackwards: React.PropTypes.func.isRequired,
    allowMoveBackwards: React.PropTypes.bool.isRequired,
    allowMoveForward: React.PropTypes.bool.isRequired
};

export default TodoGroupActionsComponent;
