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
    store.set(NAMESPACE, state);
}

/**
 * Get store state from local storage and makes it Immutable again + apply
 * undoable functionality.
 *
 * @return {Object|null}
 */
export function getPersistedState() {
    var fromStorage = store.get(NAMESPACE, null);

    if (fromStorage === null) {
        return null;
    }

    var out = {},
        undoableStates = ['future', 'history', 'past', 'present'];

    for (let key in stateNamespaces) {
        if (stateNamespaces.hasOwnProperty(key)) {
            let stateNamespace = stateNamespaces[key];

            for (let i = 0, l = undoableStates.length; i < l; i++) {
                let undableState = undoableStates[i];

                out[stateNamespace] = {};

                out[stateNamespace][undableState] = Immutable.fromJS(
                    fromStorage[stateNamespace][undableState]
                );
            }
        }
    }

    return out;
}
