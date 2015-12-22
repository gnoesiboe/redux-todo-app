import React from 'react';
import TodoGroupComponent from './TodoGroupComponent';
import AddTodoGroupComponent from './../presentation/AddTodoGroupComponent';

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
            function (todoGroup, index) {
                return (
                    <TodoGroupComponent key={todoGroup.get('cid')}
                                        cid={todoGroup.get('cid')}
                                        isStarred={todoGroup.get('isStarred')}
                                        title={todoGroup.get('title')}
                                        onTodoCompletedStatusChange={this.props.onTodoCompletedStatusChange}
                                        onAddTodo={this.props.onAddTodo}
                                        onTodoEdit={this.props.onTodoEdit}
                                        onTodoDelete={this.props.onTodoDelete}
                                        onTodoGroupTitleEdit={this.props.onTodoGroupTitleEdit}
                                        onTodoGroupDelete={this.props.onTodoGroupDelete}
                                        todos={todoGroup.get('todos')}
                                        onTodoGroupMoveBackwards={this.props.onTodoGroupMoveBackwards}
                                        onTodoGroupMoveForward={this.props.onTodoGroupMoveForward}
                                        allowMoveBackwards={index !== 0}
                                        onTodoSortUpdate={this.props.onTodoSortUpdate}
                                        onGroupStarredStatusChange={this.props.onGroupStarredStatusChange}
                                        allowMoveForward={index !== (this.props.todoGroups.count() - 1)}
                    />
                )
            }.bind(this)
        );
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <div className="todo-group-list-component clearfix">
                {this._renderTodoGroupComponents()}
                <AddTodoGroupComponent onAddTodoGroup={this.props.onAddTodoGroup}/>
            </div>
        )
    }
}

TodoGroupListComponent.propTypes = {
    onTodoDelete: React.PropTypes.func.isRequired,
    onAddTodoGroup: React.PropTypes.func.isRequired,
    onTodoCompletedStatusChange: React.PropTypes.func.isRequired,
    todoGroups: React.PropTypes.object.isRequired,
    onAddTodo: React.PropTypes.func.isRequired,
    onTodoEdit: React.PropTypes.func.isRequired,
    onTodoGroupTitleEdit: React.PropTypes.func.isRequired,
    onTodoGroupDelete: React.PropTypes.func.isRequired,
    onTodoGroupMoveBackwards: React.PropTypes.func.isRequired,
    onTodoGroupMoveForward: React.PropTypes.func.isRequired,
    onGroupStarredStatusChange: React.PropTypes.func.isRequired,
    onTodoSortUpdate: React.PropTypes.func.isRequired
};

export default TodoGroupListComponent;
