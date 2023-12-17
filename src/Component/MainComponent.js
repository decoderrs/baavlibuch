import React, { Component } from "react";

import {Routes , Route, Navigate} from 'react-router-dom';
import Header from "./Header";
import Home from "./HomeComponent";
import {InitialProfile}  from "../Redux/forms";
import { postStrings,postProfile,fetchProfile } from "../Redux/ActionCreators";
import ProfileForm from "./ProfileFormComponent";
import {connect} from "react-redux";
import {initialize } from "redux-form";

const mapStateToProps = state => {
    return {
        profiles: state.profiles,
        string: state.string
    }
}

const mapDispatchToProps = dispatch => ({
    postProfile: (name,age,gender,profile_pic,friend_list) => dispatch(postProfile(name,age,gender,profile_pic,friend_list)),
    fetchProfiles: () => dispatch(fetchProfile()),
    resetProfileForm: () => { dispatch(initialize('profile',InitialProfile,false)) },
    postStrings: () => dispatch(postStrings())
})


class Main extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.postProfile();
        this.props.fetchProfiles();
        this.props.postStrings();
    }

    render() {
        return (
            console.log('Project start',),
            <React.Fragment>
                <Header/>
                <Routes>
                    <Route path='/profileform' element={<ProfileForm profiles={this.props.profiles.profiles}
                    profileLoading={this.props.profiles.isLoading} 
                    profileErrMess= {this.props.profiles.errMess} 
                    postProfile={this.props.postProfile}
                    resetProfileForm= {this.props.resetProfileForm}/>} />
                    <Route path='*' element={<Navigate to="/profileform" replace/>} />
                </Routes>
                <Home></Home>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);