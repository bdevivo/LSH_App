import React, {PropTypes} from 'react';
import AuthService from '../../utils/AuthService';
import ProfileDetails from './ProfileDetails';
import ProfileEdit from './ProfileEdit';

class ProfilePage extends React.Component {

   constructor(props, context) {
       debugger;
      super(props, context);
      this.state = {
         profile: props.auth.getProfile()
      };

      // listen to profile_updated events to update internal state
      props.auth.on('profile_updated', (newProfile) => {
         this.setState({profile: newProfile});
      });
   }

    render() {

       const { profile } = this.state;

        return (
            <div>
                <h1>User Profile</h1>
               <ProfileDetails profile={profile}></ProfileDetails>
               <ProfileEdit profile={profile} auth={this.props.auth}></ProfileEdit>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    auth: PropTypes.instanceOf(AuthService)
};

export default ProfilePage;
