import React from 'react';
import { markdown } from 'markdown';
import { wrapAssignments, wrapTags, wrapProjects } from './../../utility/stringHelper';

/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 */
class TodoTitleComponent extends React.Component {

    /**
     * @param {String} title
     *
     * @private
     */
    _prepareTitle(title) {

        // parse markdown
        var out = markdown.toHTML(title);

        // parse tags
        out = wrapTags(out, 'text-tag');

        // parse assignments
        out = wrapAssignments(out, 'text-assignment');

        // parse projects
        out = wrapProjects(out, 'text-featured');

        return out;
    }

    /**
     * @returns {XML}
     */
    render() {
        return (
            <span className="todo-component-title"
                  dangerouslySetInnerHTML={{ __html: this._prepareTitle(this.props.title) }} />
        )
    }
}

TodoTitleComponent.propTypes = {
    title: React.PropTypes.string.isRequired
};

export default TodoTitleComponent;
