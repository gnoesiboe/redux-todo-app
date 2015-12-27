import React from 'react';
import { markdown } from 'markdown';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoTitleComponent extends React.Component {

    /**
     * @returns {XML}
     */
    render() {
        return (
            <span className="todo-component-title"
                  dangerouslySetInnerHTML={{ __html: markdown.toHTML(this.props.title) }} />
        )
    }
}

TodoTitleComponent.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default TodoTitleComponent;
