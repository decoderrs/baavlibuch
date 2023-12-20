import { Profiles } from "./profile";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formreducer } from 'redux-form';
import { InitialProfile } from './forms';
import { Addfriend } from "./addfriend";
import { Ngrams } from "./ngrams";


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profiles: Profiles,
            addfriend: Addfriend,
            ngrams: Ngrams,
            form: formreducer
        }),
        applyMiddleware(thunk,logger)
    )

    return store;
}