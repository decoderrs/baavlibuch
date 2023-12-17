import { Profiles } from "./profile";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import { reducer as formreducer } from 'redux-form';
import { InitialProfile } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profiles: Profiles,
            form: formreducer
        }),
        applyMiddleware(thunk,logger)
    )

    return store;
}