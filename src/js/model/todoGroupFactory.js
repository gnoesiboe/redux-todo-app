import TodoGroup from './todoGroup';
import TodoCollection from './../collection/todoCollection';
import { generateId } from './../utility/idGenerator';
import TodoGroupCollection from './../collection/todoGroupCollection';

/**
 * @param {String} title
 *
 * @returns {TodoGroup}
 */
export function createTodoGroup(title) {
    return new TodoGroup(
        generateId(),
        title,
        new TodoCollection()
    );
}


/**
 * @param {Array} storageInput
 *
 * @returns {TodoGroupCollection}
 */
export function createTodoGroupCollectionFromStorageInput(storageInput) {
    return TodoGroupCollection.fromNative(storageInput);
}
