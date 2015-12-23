import { Map, List } from 'immutable';
import { generateId } from './../utility/idGenerator';

/**
 * @param {String} title
 *
 * @returns {Map}
 */
export function createTodoGroup(title) {
    return Map({
        cid: generateId(),
        title: title,
        todos: List(),
        isStarred: false,
        isCurrent: false
    });
}
