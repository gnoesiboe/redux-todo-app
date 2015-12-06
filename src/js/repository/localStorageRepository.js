import store from 'store';
import Immutable from 'immutable';
import * as stateNamespaces from './../state/stateNamespace';

/** @var string */
const NAMESPACE = 'state';

/**
 * Takes store state, makes it mutable again (makes it a plain javascript object) and
 * stores it in local storage.
 *
 * @param {List} state
 */
export function persist(state) {
    var serializedState = {};

    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            let stateItem = state[key];

            if (typeof stateItem.toJSON !== 'undefined') {
                serializedState[key] = stateItem.toJSON();
            } else {
                serializedState[key] = stateItem;
            }
        }
    }

    store.set(NAMESPACE, serializedState);
}

/**
 * Get store state from local storage and makes it Immutable again
 *
 * @return {Object|null}
 */
export function getPersistedState() {
    var fromStorage = store.get(NAMESPACE, null);

    if (fromStorage === null) {
        return null;
    }

    var out = {};

    for (let key in stateNamespaces) {
        if (stateNamespaces.hasOwnProperty(key)) {
            let stateNamespace = stateNamespaces[key];

            out[stateNamespace] = Immutable.fromJS(fromStorage[stateNamespace]);
        }
    }

    return out;
}
