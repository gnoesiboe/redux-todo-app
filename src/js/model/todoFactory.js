import { generateId } from './../utility/idGenerator';
import { Map } from 'immutable';

/**
 * @param {String} title
 * @param {Boolean=} isCompleted
 *
 * @returns {Map}
 */
export function createTodo(title, isCompleted = false) {
    return Map({
        cid: generateId(),
        title: title,
        isCompleted: isCompleted
    });
}
