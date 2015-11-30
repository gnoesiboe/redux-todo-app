import React from 'react';
import TodoGroupComponent from './TodoGroupComponent';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoGroupListComponent extends React.Component {

    /**
     * @returns {XML}
     *
     * @private
     */
    _renderTodoGroupComponents() {
        return this.props.todoGroups.map(
            function (todoGroup) {
                return (
                    <TodoGroupComponent key={todoGroup.get('cid')}
                                        cid={todoGroup.get('cid')}
                                        title={todoGroup.get('title')}
                                        onTodoCompletedStatusChange={this.props.onTodoCompletedStatusChange}
                                        onAddTodo={this.props.onAddTodo}
                                        todos={todoGroup.get('todos')} />
                )
            }.bind(this)
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div>
                {this._renderTodoGroupComponents()}
            </div>
        )
    }
}

TodoGroupListComponent.propTypes= {
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    todoGroups: React.PropTypes.object.isRequired,
    onAddTodo: React.PropTypes.func.isRequired
};

export default TodoGroupListComponent;
