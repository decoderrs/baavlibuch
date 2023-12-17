import React, { Component } from "react";
// import { reduxForm , Field} from "redux-form";


class ProfileForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(values) {
        this.props.postProfile(values.name, values.age, values.gender, values.profile_pic, values.friend_list);
        console.log('Current state is: ' + JSON.stringify(this.props.postProfile));
        this.props.resetProfileForm();

    }


    render() {
        return (
            <form onSubmit={(values) => this.handleSubmit(values)} enctype="multipart/form-data">
                <div class="mb-3">
                    <label htmlFor="name" class="form-label">Name</label>
                    <input type="text" name="name" class="form-control" id="name" />
                </div><div class="mb-3">
                    <label htmlFor="age" class="form-label">Age</label>
                    <input type="number" name="age" class="form-control" id="age" />
                </div><div class="mb-3">
                    <label htmlFor="gender" class="form-label">Gender</label>
                    <input type="text" name="gender" class="form-control" id="gender" />
                </div><div class="mb-3">
                    <label htmlFor="profilepic" class="form-label">Profile Pic</label>
                    <input type="file" name="profile_pic" class="form-control" id="profilepic" />
                </div><div class="mb-3">
                    <label for="friendlist" class="form-label">Password</label>
                    <input type="text" name="friend_list" class="form-control" id="friendlist" />
                </div>
                <button type='submit' color='primary' className='me-3'>
                    Send Profile
                </button>
                <button type='reset' color='outline-primary' border>
                    Cancel
                </button>
            </form>
        )
    }
}

export default ProfileForm;
// = reduxForm({
//     form: 'profile'
// })(ProfileForm)