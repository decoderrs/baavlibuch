import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchProfile = () => (dispatch) => {
    dispatch(profileLoading(true));

    return fetch(baseUrl + 'friend-api')
    .then(response => {
        if(response.ok) {
            return response;
        } else {
            var error = new Error('Error '+ response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(profile => dispatch(add_profile(profile)))
    .catch(error => dispatch(profile_failed(error.message)));
}


export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING,
})

export const profile_failed = (errmess) => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: errmess
})

export const add_profile = (profile) => ({
    tpe: ActionTypes.ADD_PROFILE,
    payload: profile
})

export  const postStrings = (string1,string2) => (dispatch) => ({

})

export const postProfile = (name,age,gender,profile_pic,friend_list) => (dispatch) => {
    const newProfile = {
        name: name,
        age: age,
        gender: gender,
        profile_pic: profile_pic,
        friend_list: [].concat(friend_list)
    }

    return fetch(baseUrl + 'friend-api', {
        method: 'POST',
        body: JSON.stringify(newProfile),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        } else {
            var error = new Error('Error '+ response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(add_profile(response)))
    .catch(error => dispatch(profile_failed(error.message)))

};