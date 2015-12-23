import { generateId } from './../utility/idGenerator';
import { Map } from 'immutable';

/**
 * @param {String} title
 *
 * @returns {Map}
 */
export function createTodo(title) {
    return Map({
        cid: generateId(),
        title: title,
        isCompleted: false,
        isCurrent: false
    });
}
