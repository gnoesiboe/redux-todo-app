import React from 'react';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class ExplanationComponent extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="explanation-component">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Introduction</h3>
                    </div>
                    <div className="panel-body">
                        <div className="col-sm-6 col-md-4 spacer-bottom-m">
                            <h5>Features:</h5>
                            <ul>
                                <li>Create/edit/remote a todo group.</li>
                                <li>Move todo groups to left and right.</li>
                                <li>Star a todo group to make it visually jump out.</li>
                                <li>Create/edit/remote a todo within a todo group.</li>
                                <li>Mark a todo as completed.</li>
                                <li>Use <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a> in todo titles for links and visualization.</li>
                                <li>Use tags (<code>#waiting</code>) and assignments (<code>@peter</code>) in todo title.</li>
                                <li>Use project or categorizing (<code>[HOME]</code>) in todo title.</li>
                                <li>Set a deadline on a todo and watch it display differently once the deadline comes near and when it expired.</li>
                                <li>Use drag-and-drop to re-order todos or re-arrange them between groups.</li>
                                <li>Star a todo to make it visually jump out.</li>
                                <li>Undo and redo actions. 10 actions are kept in memory.</li>
                                <li>Use keyboard shortcuts to navigate through the application.</li>
                                <li>Display notifications when important events or errors occurred.</li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-4 spacer-bottom-m">
                            <h5>Keyboard shortcuts:</h5>

                            <table className="table">
                                <tbody>
                                <tr>
                                    <td><code>cmd + z</code></td>
                                    <td>Undo last action(s)</td>
                                </tr>
                                <tr>
                                    <td><code>cmd + shift + z</code></td>
                                    <td>Redo cancelled action(s)</td>
                                </tr>
                                <tr>
                                    <td><code>&rarr;</code></td>
                                    <td>Move cursor to next todo group.</td>
                                </tr>
                                <tr>
                                    <td><code>&larr;</code></td>
                                    <td>Move cursor to previous todo group.</td>
                                </tr>
                                <tr>
                                    <td><code>&darr;</code></td>
                                    <td>Move cursor to next todo within the current todo group.</td>
                                </tr>
                                <tr>
                                    <td><code>&uarr;</code></td>
                                    <td>Move cursor to previous todo within the current todo group.</td>
                                </tr>
                                <tr>
                                    <td><code>e</code></td>
                                    <td>Edit currently selected todo.</td>
                                </tr>
                                <tr>
                                    <td><code>space</code></td>
                                    <td>Toggle the is-completed status of the currently selected todo.</td>
                                </tr>
                                <tr>
                                    <td><code>x</code></td>
                                    <td>Delete the currently selected todo.</td>
                                </tr>
                                <tr>
                                    <td><code>s</code></td>
                                    <td>Toggle the is-starred status of the currently selected todo.</td>
                                </tr>
                                <tr>
                                    <td><code>a</code></td>
                                    <td>Focus 'add todo'-input of the currently selected todo group.</td>
                                </tr>
                                <tr>
                                    <td><code>esc</code></td>
                                    <td>Unfocuses 'add todo'-input field, if it is focussed.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-6 col-md-4 spacer-bottom-m">
                            <h5>Links</h5>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <a href="https://github.com/gnoesiboe/redux-todo-app" target="_blank">Github</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="https://github.com/gnoesiboe/redux-todo-app/issues" target="_blank">Issues</a>
                                </li>
                                <li className="list-group-item">
                                    <a href="mailto:gijsnieuwenhuis@gmail.com" target="_blank">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ExplanationComponent.propTypes = {};

export default ExplanationComponent;
