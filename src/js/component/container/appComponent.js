import React from 'react';
import * as reactRedux from 'react-redux';
import * as actionFactory from '../../actions/actionFactory';
import TodoGroupListComponent from './../presentation/TodoGroupListComponent';
import * as stateNamespace from './../../state/stateNamespace';
import mousetrap from 'mousetrap';
import { ActionCreators } from 'redux-undo';
import { resizeToContent } from './../../utility/rowResizer';
import { notifySuccess, notifyError } from './../../utility/notifier';
import ExplanationComponent from './../presentation/ExplanationComponent.js';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class AppComponent extends React.Component {

    /**
     * @param {Object} props
     */
    constructor(props) {
        super(props);

        this._createKeyboardEventCallbacksPointingToThis();
    }

    /**
     * @private
     */
    _createKeyboardEventCallbacksPointingToThis() {
        this._onUndoKeybindingPressedCallback = this._onUndoKeybindingPressed.bind(this);
        this._onRedoKeybindingPressedCallback = this._onRedoKeybindingPressed.bind(this);
        this._onSelectNextGroupCallback = this._onSelectNextGroupPressed.bind(this);
        this._onSelectPreviousGroupCallback = this._onSelectPreviousGroupPressed.bind(this);
        this._onSelectNextTodoCallback = this._onSelectNextTodoBindingPressed.bind(this);
        this._onSelectPreviousTodoCallback = this._onSelectPreviousTodoBindingPressed.bind(this);
        this._onEditCurrentTodoKeybindingPressedCallback = this._onEditCurrentTodoKeybindingPressed.bind(this);
        this._onToggleTodoIsCompletedStatusKeybindingPressedCallback = this._onToggleTodoIsCompletedStatusKeybindingPressed.bind(this);
        this._onDeleteCurrentTodoKeybindingPressedCallback = this._onDeleteCurrentTodoKeybindingPressed.bind(this);
        this._onToggleCurrentTodoIsStarredStatusKeybindingPressedCallback = this._onToggleCurrentTodoIsStarredStatusKeybindingPressed.bind(this);
        this._onToggleShowExplanationCallback = this._onToggleShowExplanationKeybindingPressed.bind(this);
    }

    /**
     * @inheritDoc
     */
    componentDidMount() {
        this._registerKeyboardBindings();
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        this._unregisterKeyboardBindings();
    }

    /**
     * @private
     */
    _registerKeyboardBindings() {

        // undo-redo
        mousetrap.bind('meta+z', this._onUndoKeybindingPressedCallback);
        mousetrap.bind('meta+shift+z', this._onRedoKeybindingPressedCallback);

        // group navigation
        mousetrap.bind(['right', 'n'], this._onSelectNextGroupCallback);
        mousetrap.bind(['left', 'p'], this._onSelectPreviousGroupCallback);

        // todo navigation
        mousetrap.bind(['down', 'j'], this._onSelectNextTodoCallback);
        mousetrap.bind(['up', 'k'], this._onSelectPreviousTodoCallback);

        // actions to current item
        mousetrap.bind('e', this._onEditCurrentTodoKeybindingPressedCallback);
        mousetrap.bind('space', this._onToggleTodoIsCompletedStatusKeybindingPressedCallback);
        mousetrap.bind('x', this._onDeleteCurrentTodoKeybindingPressedCallback);
        mousetrap.bind('s', this._onToggleCurrentTodoIsStarredStatusKeybindingPressedCallback);

        // show explanation
        mousetrap.bind('?', this._onToggleShowExplanationCallback);
    }

    /**
     * @private
     */
    _unregisterKeyboardBindings() {

        // undo-redo
        mousetrap.unbind('meta+z', this._onUndoKeybindingPressedCallback);
        mousetrap.unbind('meta+shift+z', this._onRedoKeybindingPressedCallback);

        // group navigation
        mousetrap.unbind('right', this._onSelectNextGroupCallback);
        mousetrap.unbind('left', this._onSelectPreviousGroupCallback);

        // todo navigation
        mousetrap.unbind('down', this._onSelectNextTodoCallback);
        mousetrap.unbind('up', this._onSelectPreviousTodoCallback);

        // actions to current item
        mousetrap.unbind('e', this._onEditCurrentTodoKeybindingPressedCallback);
        mousetrap.unbind('space', this._onToggleTodoIsCompletedStatusKeybindingPressedCallback);
        mousetrap.unbind('x', this._onDeleteCurrentTodoKeybindingPressedCallback);
        mousetrap.unbind('s', this._onToggleCurrentTodoIsStarredStatusKeybindingPressedCallback);

        // show explanation
        mousetrap.unbind('?', this._onToggleShowExplanationCallback);
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onToggleShowExplanationKeybindingPressed(event) {
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createToggleShowExplanationAction()
        );
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onToggleCurrentTodoIsStarredStatusKeybindingPressed(event) {
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createToggleCurrentTodoIsStarredStatusAction()
        )
            .then(function () {
                resizeToContent();
            })
            .catch(function (error) {
                notifyError(error.message);
            })
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onDeleteCurrentTodoKeybindingPressed(event) {

        // prevent browser from typing in first form field of edit form
        event.preventDefault();

        if (confirm('Are you sure?!')) {
            this.props.dispatch(
                actionFactory.createDeleteCurrentTodoAction()
            )
                .then(function () {
                    resizeToContent();
                })
                .catch(function (error) {
                    notifyError(error.message);
                });
        }
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onToggleTodoIsCompletedStatusKeybindingPressed(event) {

        // prevent browser from typing in first form field of edit form
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createToggleCurrentTodoIsCompletedStatusAction()
        )
            .catch(function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onEditCurrentTodoKeybindingPressed(event) {

        // prevent browser from typing in first form field of edit form
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createEditCurrentTodoAction()
        )
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onSelectPreviousTodoBindingPressed(event) {

        // prevent browser from scrolling up
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createSelectPreviousTodoAction()
        )
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onSelectNextTodoBindingPressed(event) {

        // prevent browser from scolling down
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createSelectNextTodoAction()
        )
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onSelectNextGroupPressed(event) {
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createSelectNextTodoGroupAction()
        )
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onSelectPreviousGroupPressed(event) {
        event.preventDefault();

        this.props.dispatch(
            actionFactory.createSelectPreviousTodoGroupAction()
        )
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {Object} event
     *
     * @private
     */
    _onRedoKeybindingPressed(event) {

        // prevent browser from re-entering inputs
        event.preventDefault();

        if (!this.props.redoPossible) {
            return;
        }

        this.props.dispatch(ActionCreators.redo());

        resizeToContent();
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

        resizeToContent();
    }

    /**
     * @param {String} title
     *
     * @private
     */
    _onAddTodoGroup(title) {
        this.props.dispatch(
            actionFactory.createAddGroupAction(title)
        )
            .then (function () {
                resizeToContent();
            });
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
        )
            .then (function () {
                resizeToContent();
            })
            .catch(function (error) {
                notifyError(error.message);
            });
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
        )
            .then (function (action) {
                notifySuccess(`Todo ${action.title} added`);
            })
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
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
        )
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
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
        )
            .then (function () {
                notifySuccess('todo was updated');
            })
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} cid
     * @param {String} newTitle
     *
     * @private
     */
    _onTodoGroupTitleEdit(cid, newTitle) {
        this.props.dispatch(
            actionFactory.createEditTodoGroupTitleAction(cid, newTitle)
        )
            .then (function () {
                notifySuccess('Todo group title updated');
            })
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} cid
     *
     * @private
     */
    _onTodoGroupDelete(cid) {
        this.props.dispatch(
            actionFactory.createDeleteTodoGroupAction(cid)
        )
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} cid
     *
     * @private
     */
    _onTodoGroupMoveForward(cid) {
        this.props.dispatch(
            actionFactory.createMoveTodoGroupForwardAction(cid)
        )
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} cid
     *
     * @private
     */
    _onTodoGroupMoveBackwards(cid) {
        this.props.dispatch(
            actionFactory.createMoveTodoGroupBackwardsAction(cid)
        )
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} cid
     * @param {Boolean} newStatus
     *
     * @private
     */
    _onGroupStarredStatusChange(cid, newStatus) {
        this.props.dispatch(
            actionFactory.createUpdateGroupStarredStatusAction(cid, newStatus)
        )
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} fromGroupCid
     * @param {String} toGroupCid
     * @param {Number} fromIndex
     * @param {Number} toIndex
     *
     * @private
     */
    _onTodoSortUpdate(fromGroupCid, toGroupCid, fromIndex, toIndex) {
        this.props.dispatch(
            actionFactory.createTodoSortUpdateAction(fromGroupCid, toGroupCid, fromIndex, toIndex)
        )
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} cid
     * @param {String} groupCid
     *
     * @private
     */
    _onSwitchTodoDisplayMode(cid, groupCid) {
        this.props.dispatch(
            actionFactory.createSwitchToTodoEditModeAction(cid, groupCid)
        )
            .then (function () {
                resizeToContent();
            })
            .catch (function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @param {String} cid
     * @param {String} groupCid
     *
     * @private
     */
    _onToggleTodoIsStarredStatus(cid, groupCid) {
        this.props.dispatch(
            actionFactory.createToggleTodoIsStarredStatusAction(cid, groupCid)
        )
            .then(function () {
                resizeToContent();
            })
            .catch(function (error) {
                notifyError(error.message);
            });
    }

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderExplanation() {
        if (!this.props.showExplanation) {
            return null;
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    <ExplanationComponent />
                </div>
            </div>
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="app-container-wrapper">
                <div className="header-component">
                    <h1 className="header-component-title">@_<sub>TODO</sub></h1>
                </div>
                <TodoGroupListComponent todoGroups={this.props.todoGroups}
                                        onAddTodo={this._onAddTodo.bind(this)}
                                        onAddTodoGroup={this._onAddTodoGroup.bind(this)}
                                        onTodoDelete={this._onTodoDelete.bind(this)}
                                        onTodoEdit={this._onTodoEdit.bind(this)}
                                        onTodoGroupTitleEdit={this._onTodoGroupTitleEdit.bind(this)}
                                        onTodoGroupDelete={this._onTodoGroupDelete.bind(this)}
                                        onTodoGroupMoveForward={this._onTodoGroupMoveForward.bind(this)}
                                        onTodoGroupMoveBackwards={this._onTodoGroupMoveBackwards.bind(this)}
                                        onTodoSortUpdate={this._onTodoSortUpdate.bind(this)}
                                        onSwitchTodoDisplayMode={this._onSwitchTodoDisplayMode.bind(this)}
                                        onToggleTodoIsStarredStatus={this._onToggleTodoIsStarredStatus.bind(this)}
                                        onGroupStarredStatusChange={this._onGroupStarredStatusChange.bind(this)}
                                        onTodoCompletedStatusChange={this._onTodoCompletedStatusChange.bind(this)} />
                {this._renderExplanation()}
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
        todoGroups: completeState[stateNamespace.TODO_GROUPS].present,
        showExplanation: completeState[stateNamespace.CURRENT].showExplanation
    };
};

export default reactRedux.connect(mapCompleteStateToAppComponentProps)(AppComponent);
