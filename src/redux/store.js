import applicationReducer from './reducers/application'
import pokemonsReducer from './reducers/pokemons'
import generationReducer from './reducers/generations'
import {combineReducers} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import FilesystemStorage from 'redux-persist-filesystem-storage'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'


const rootReducer = combineReducers(
    {
        application: applicationReducer,
        pokemons: pokemonsReducer,
        generations: generationReducer,
    },
)

const persistConfig = {
    key: 'root',
    storage: FilesystemStorage,
    whitelist: ['application', 'generations', 'pokemons'],
    blacklist: [],
    timeout: null,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]}
)

let persistor = persistStore(store)

export {
    store,
    persistor,
}
