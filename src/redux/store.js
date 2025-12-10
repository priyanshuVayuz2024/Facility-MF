// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import randomSlice from './slice/randomSlice';
import { combineReducers } from 'redux';

// ----------- Reducer Manager -----------
export function createReducerManager(initialReducers) {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);
    const keysToRemove = [];

    return {
        getReducerMap: () => reducers,

        reduce: (state, action) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                for (const key of keysToRemove) {
                    delete state[key];
                }
                keysToRemove.length = 0;
            }

            return combinedReducer(state, action);
        },

        add: (key, reducer) => {
            if (!key || reducers[key]) return;
            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);
        },

        remove: (key) => {
            if (!key || !reducers[key]) return;
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}

// ----------- Initial Reducers -----------
const initialReducers = {
    root: randomSlice,
};

// ----------- Create Reducer Manager -----------
const reducerManager = createReducerManager(initialReducers);

// ----------- Configure Store -----------
const store = configureStore({
    reducer: reducerManager.reduce, // Use dynamic reducer
});

// Attach reducer manager to store instance
store.reducerManager = reducerManager;

// Expose to microfrontends
window.sharedStore = store;

export default store;
