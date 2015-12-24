import { generateId } from './../utility/idGenerator';
import Todo from './todo';

/**
 * @param {String} title
 *
 * @returns {Todo}
 */
export function createTodo(title) {
    return new Todo(
        generateId(),
        title
    );
}
