import React, { Component } from "react";

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Header";
import Home from "./HomeComponent";
import { InitialProfile } from "../Redux/forms";
import { postStrings, postProfile, fetchProfile, postfriend } from "../Redux/ActionCreators";
import ProfileForm from "./ProfileFormComponent";
import { connect } from "react-redux";
import { initialize } from "redux-form";
import Addfriend from "./AddFriendComponent";
import Ngrams from "./NgramComponent";

const mapStateToProps = state => {
    return {
        profiles: state.profiles,
        ngrams: state.ngrams,
        addfriend: state.addfriend,
    }
}

const mapDispatchToProps = dispatch => ({
    postProfile: (name, age, gender, profile_pic, friend_list) => dispatch(postProfile(name, age, gender, profile_pic, friend_list)),
    fetchProfiles: () => dispatch(fetchProfile()),
    resetProfileForm: () => { dispatch(initialize('profile', InitialProfile, false)) },
    postStrings: () => (string1,string2,ngram) => dispatch(postStrings(string1,string2,ngram)),
    postfriend: (addfriend) => dispatch(postfriend(addfriend))
})


class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.postProfile();
        this.props.fetchProfiles();
        this.props.postStrings();
        // this.props.postfriend();
        
    }

    render() {
        return (
            console.log('Project start'),
            <React.Fragment>
                <Header />
                <Routes>
                    <Route path='/profileform' element={<ProfileForm profiles={this.props.profiles.profiles}
                        profileLoading={this.props.profiles.isLoading}
                        profileErrMess={this.props.profiles.errMess}
                        postProfile={this.props.postProfile}
                        resetProfileForm={this.props.resetProfileForm} />} />
                    <Route path='/addFriend' element={<Addfriend profiles={this.props.profiles.profiles}
                        fetchProfile= {this.props.fetchProfile}
                        profileLoading={this.props.profiles.isLoading}
                        profileErrMess={this.props.profiles.errMess}
                        postfriend={this.props.postfriend} />} />
                    <Route path="/nGram" element={ <Ngrams postStrings={this.props.postStrings}
                        ngrams= {this.props.ngrams.ngrams}
                        ngramsLoading = {this.props.ngrams.isLoading}
                        ngramsErrMess = {this.props.ngrams.errMess} />
                    } />
                    <Route path='*' element={<Navigate to="/profileform" replace />} />
                    
                </Routes>
                <Home></Home>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);