import {auth} from '../auth';


const ProfileApi = {

    getProfile() {
        return auth.getProfile();
    },

    updateProfileName(first, middle, last) {

        auth.updateProfile({
            user_metadata: {
                firstName: first,
                middleInit: middle,
                lastName: last,
            }
        })
        .then(response => response.json())
        .then(newProfile => {
            return new Promise(function (resolve, reject) {
                if (!newProfile.error) {
                    auth.setProfile(newProfile);   //update current profile in local storage
                    resolve(newProfile);
                }
                else {
                    console.log(`Error updating profile! error: ${newProfile.error} | error code: ${newProfile.errorCode} | error message: ${newProfile.message}`);
                    reject();
                }
            });
        });
    },

    login() {
        return new Promise(function (resolve, reject) {

        // how to wrap the return event in a Promise?

            auth.login();
        }





};

export default ProfileApi;





