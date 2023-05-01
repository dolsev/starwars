import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers';

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState')!)
    : undefined;

const store = configureStore({
    reducer,
    preloadedState: persistedState,
});

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
