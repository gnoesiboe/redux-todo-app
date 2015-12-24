import store from 'store';
import * as stateNamespaces from './../state/stateNamespace';
import { createTodoGroupCollectionFromStorageInput } from './../model/todoGroupFactory';

/**
 * @param {List} state
 */
export function persist(state) {
    Object.keys(stateNamespaces).map(function (key) {
        var stateValue = state[stateNamespaces[key]].present,
            dataToStore = typeof stateValue.toNative !== 'undefined' ? stateValue.toNative() : stateValue;

        store.set(stateNamespaces[key], dataToStore);
    });
}

/**
 * @return {Object|null}
 */
export function getPersistedState() {
    return {
        [stateNamespaces.TODO_GROUPS]: {
            present: createTodoGroupCollectionFromStorageInput(store.get(stateNamespaces.TODO_GROUPS, []))
        }
    };
}
