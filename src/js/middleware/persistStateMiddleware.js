import { persist } from './../repository/localStorageRepository';

var persistStateMiddleware = store => next => action => {
    var result = next(action);

    // persist new state
    persist(store.getState());

    return result;
};

export default persistStateMiddleware;
