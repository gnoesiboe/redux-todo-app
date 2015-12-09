import React from 'react';
import * as reactRedux from 'react-redux';
import * as actionFactory from '../../actions/actionFactory';
import TodoGroupListComponent from './../presentation/TodoGroupListComponent';
import * as stateNamespace from './../../state/stateNamespace';
import mousetrap from 'mousetrap';
import { ActionCreators } from 'redux-undo'

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class AppComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this._onUndoKeybindingPressedCallback = this._onUndoKeybindingPressed.bind(this);
        this._onRedoKeybindingPressedCallback = this._onRedoKeybindingPressed.bind(this);
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        mousetrap.bind('meta+z', this._onUndoKeybindingPressedCallback);
        mousetrap.bind('meta+shift+z', this._onRedoKeybindingPressedCallback);
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        mousetrap.unbind('meta+z', this._onUndoKeybindingPressedCallback);
        mousetrap.unbind('meta+shift+z', this._onRedoKeybindingPressedCallback);
    }

    /**
     * @private
     */
    _onRedoKeybindingPressed(event) {

        // prevent browser from re-entering inputs
        event.preventDefault();

        if (!this.props.redoPossible) {
            console.log('kan niet');
            return;
        }

        this.props.dispatch(ActionCreators.redo());
    }

    /**
     * @private
     */
    _onUndoKeybindingPressed(event) {

        // prevent browser from re-entering inputs
        event.preventDefault();

        if (!this.props.undoPossible) {
            return;
        }

        this.props.dispatch(ActionCreators.undo());
    }

    /**
     * @param {String} title
     *
     * @private
     */
    _onAddTodoGroup(title) {
        this.props.dispatch(
            actionFactory.createAddGroupAction(title)
        );
    }

    /**
     * @param {String} cid
     * @param {Boolean} newIsCompleted
     * @param {String} groupCid
     *
     * @private
     */
    _onTodoCompletedStatusChange(cid, newIsCompleted, groupCid) {
        this.props.dispatch(
            actionFactory.createChangeTodoIsCompletedStatusAction(cid, newIsCompleted, groupCid)
        );
    }

    /**
     * @param {String} title
     * @param {String} groupCid
     *
     * @private
     */
    _onAddTodo(title, groupCid) {
        this.props.dispatch(
            actionFactory.createAddTodoAction(title, groupCid)
        );
    }

    /**
     * @param {String} cid
     * @param {String} groupCid
     *
     * @private
     */
    _onTodoDelete(cid, groupCid) {
        this.props.dispatch(
            actionFactory.createDeleteTodoAction(cid, groupCid)
        );
    }

    /**
     * @param {String} cid
     * @param {String} newTitle
     * @param {String} newDeadline
     * @param {String} groupCid
     *
     * @private
     */
    _onTodoEdit(cid, newTitle, newDeadline, groupCid) {
        this.props.dispatch(
            actionFactory.createEditTodoAction(cid, newTitle, newDeadline, groupCid)
        );
    }

    /**
     * @param {String} cid
     * @param {String} newTitle
     *
     * @private
     */
    _onTodoGroupTitleEdit(cid, newTitle) {
        this.props.dispatch(
            actionFactory.createChangeTodoGroupTitleAction(cid, newTitle)
        );
    }

    /**
     * @param {String} cid
     *
     * @private
     */
    _onTodoGroupDelete(cid) {
        this.props.dispatch(
            actionFactory.createDeleteTodoGroupAction(cid)
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="app-container-wrapper">
                <TodoGroupListComponent todoGroups={this.props.todoGroups}
                                        onAddTodo={this._onAddTodo.bind(this)}
                                        onAddTodoGroup={this._onAddTodoGroup.bind(this)}
                                        onTodoDelete={this._onTodoDelete.bind(this)}
                                        onTodoEdit={this._onTodoEdit.bind(this)}
                                        onTodoGroupTitleEdit={this._onTodoGroupTitleEdit.bind(this)}
                                        onTodoGroupDelete={this._onTodoGroupDelete.bind(this)}
                                        onTodoCompletedStatusChange={this._onTodoCompletedStatusChange.bind(this)} />
            </div>
        );
    }
}

/**
 * @param {Object} completeState
 *
 * @returns {Object}
 */
var mapCompleteStateToAppComponentProps = function (completeState) {
    return {
        undoPossible: completeState[stateNamespace.TODO_GROUPS].past.length > 0,
        redoPossible: completeState[stateNamespace.TODO_GROUPS].future.length > 0,
        todoGroups: completeState[stateNamespace.TODO_GROUPS].present
    };
};

export default reactRedux.connect(mapCompleteStateToAppComponentProps)(AppComponent);
