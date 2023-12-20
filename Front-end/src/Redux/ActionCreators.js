import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchProfile = () => (dispatch) => {
    dispatch(profileLoading(true));

    return fetch(baseUrl + 'friend-api')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
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

export const add_profile = (profiles) => ({
    type: ActionTypes.ADD_PROFILE,
    payload: profiles
})

export const postStrings = (string1, string2, ngram) => (dispatch) => {
    console.log('final day : '+ newdata);
    const newdata= {
        text1 : string1,
        text2 : string2,
        n: ngram
    }
    return fetch('http://127.0.0.1:8000/api/ngram-comparison/', {
        method: 'POST',
        body: JSON.stringify(newdata),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then((response) => {
            if (response.ok) {
                return response
            }
            else {
                var err = new Error('Error :' + response.status + ' tex: ' + response.statusText);
                err.response = response;
                throw err;
            }
        }, error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addString(response)))
        .catch(error => dispatch(ngramFailed(error)));
}

export const ngramLoading = () => ({
    type: ActionTypes.STRING_LOADING,
})

export const ngramFailed = (errmess) => ({
    type: ActionTypes.STRING_FAILED,
    payload: errmess
})

export const addString = (ngram) => ({
    type: ActionTypes.ADD_STRING,
    payload: ngram
})

export const postProfile = (name, age, gender, profile_pic, friend_list) => (dispatch) => {
    const newProfile = {
        name: name,
        age: age,
        gender: gender,
        profile_pic: profile_pic,
        friend_list: []
    }

    return fetch(baseUrl + 'friend-api', {
        method: 'POST',
        body: JSON.stringify(newProfile),
        headers: {
            'Content-Type': 'text/html'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
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


export const postfriend = (profile, name) => (dispatch) => {
    const newProfile = {
        profile: profile,
        name: name
    }

    return fetch(baseUrl + 'add-friend', {
        method: 'POST',
        body: JSON.stringify(newProfile),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(addFriend(response)))
        .catch(error => dispatch(addFriendFailed(error.message)))
}

export const addFriend = (friend) => ({
    type: ActionTypes.ADD_FRIEND,
    payload: friend
})

export const addFriendFailed = (errmess) => ({
    type: ActionTypes.ADD_FRIEND_FAILED,
    payload: errmess
}
)