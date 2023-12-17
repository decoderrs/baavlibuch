import * as ActionTypes from './ActionTypes';

export const Profiles = (state = {
    isLoading: true,
    errMess: null,
    profiles: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROFILE:
            return {...state, isLoading: false, errMess: null, profile: action.payload }
        case ActionTypes.PROFILE_LOADING:
            return {...state, isLoading: true, errMess:null, payload: [] }
            case ActionTypes.GET_PROFILE:
            var profile = action.payload;
            return  {...state, profile: state.profiles.concat(profile)}
        case ActionTypes.PROFILE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, payload: []};
        default:
            return state;
        
    }
}