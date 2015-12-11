import { Map, List } from 'immutable';
import { generateId } from './../utility/idGenerator';
import { createTodo } from './todoFactory';

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
        isStarred: false
    });
}
