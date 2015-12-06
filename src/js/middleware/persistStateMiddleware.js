import { persist } from './../repository/localStorageRepository';

var persistStateMiddleware = store => next => action => {
    next(action);

    // persist new state
    persist(store.getState());
};

export default persistStateMiddleware;
