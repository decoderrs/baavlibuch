import React, { Component } from "react";
// import { reduxForm , Field} from "redux-form";
import { baseUrl } from "../shared/baseUrl";

class ProfileForm extends Component {
    
    
    constructor(props) {
        super(props);

        
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(values) {
        this.props.postProfile(values.name, values.age, values.gender, values.profile_pic, values.friend_list);
        console.log('Current state is: ' , values);
        this.props.resetProfileForm();

    }

    imagesrc(values){
        return values.profile_pic;
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="card" style={{ width: '40rem' }}>
                            <div className="card-body p-2">
                                <h5 className="card-title">Profile form</h5>
                                <form action={`${baseUrl}friend-api`} method="POST" encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" id="name" />
                                    </div><div className="mb-3">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input type="number" name="age" className="form-control" id="age" />
                                    </div><div className="mb-3">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <input type="text" name="gender" className="form-control" id="gender" />
                                    </div><div className="mb-3">
                                        <label htmlFor="profilepic" className="form-label">Profile Pic</label>
                                        <input type="file" name="profile_pic" className="form-control" id="profilepic" />
                                    </div><div className="mb-3">
                                        <label for="friendlist" className="form-label">Friend List</label>
                                        <input type="text" name="friend_list" className="form-control" id="friendlist" />
                                    </div>
                                    <button type='submit' color='primary' className='me-3'>
                                        Send Profile
                                    </button>
                                    <button type='reset' color='outline-primary' border>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>

        )
    }
}

export default ProfileForm;
// = reduxForm({
//     form: 'profile'
// })(ProfileForm)