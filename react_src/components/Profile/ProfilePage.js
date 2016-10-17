import React, {PropTypes} from 'react';
import AuthService from '../../utils/AuthService';

class ProfilePage extends React.Component {

    constructor()
    {
        super();
        this.getProfile = this.getProfile.bind(this);
    }

    getProfile()
    {
        let profile = this.props.auth.getProfile();
        let isAdmin = this.props.auth.isAdmin();
        debugger;
    }

    render() {

        return (
            <div>
                <h1>User Profile</h1>
                <button onClick={this.getProfile}>Details</button>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    auth: PropTypes.instanceOf(AuthService)
};


export default ProfilePage;