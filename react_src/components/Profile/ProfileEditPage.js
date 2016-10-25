import React, {PropTypes} from 'react';
import AuthService from '../../utils/AuthService';
import ProfileEdit from './ProfileEdit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as profileActions from '../../actions/profileActions';
import { browserHistory } from 'react-router';
import AWS from 'aws-sdk';

const update = require('react-addons-update');
const pathParse = require('path-parse');

class ProfileEditPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.profile,
            avatarTimestamp: new Date().getTime().toString(),
            avatarStorageKey: "",
            avatarLocalFileName: "",
            localAvatarFile: {}
        };

        this.updateProfileAddressState = this.updateProfileAddressState.bind(this);
        this.updateProfileAddressField = this.updateProfileAddressField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateProfileName = this.updateProfileName.bind(this);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);
        this.uploadAvatarImage = this.uploadAvatarImage.bind(this);
    }

    // componentWillMount()
    // {
    //     this.props.auth.on('profile_updated', () => {
    //         this.onProfileUpdated();
    //     });
    // }
    //
    // componentWillUnmount()
    // {
    //     this.props.auth.removeListener('profile_updated', this.onProfileUpdated);
    // }

    onProfileUpdated()
    {
        browserHistory.push('/profile');
    }

    handleAvatarChange(event, results) {
        //debugger;
        const [e, file] = results[0];
        const storageKey = "avatarTempData";
        results.forEach(result => {
            const [e] = result;
            localStorage.setItem(storageKey, e.target.result);
        });

        //debugger;
        this.setState({ // this should trigger the Avatar component to re-render
            avatarTimestamp: new Date().getTime().toString(),
            avatarStorageKey: storageKey,
            avatarLocalFileName: file.name,
            localAvatarFile: file
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        //const {auth} = this.props;
        const {profile, avatarLocalFileName} = this.state;

        let avatarUrl = profile.user_metadata.profilePicture;
        if (avatarLocalFileName)
        {
            this.uploadAvatarImage();
            localStorage.removeItem('avatarTempData');
        }
        let {first, middle, last} = profile.user_metadata;

        this.props.actions.updateProfileName(first, middle, last);

        //debugger;
        // auth.updateProfile(profile.user_id, {
        //     user_metadata: {
        //         firstName: profile.user_metadata.firstName,
        //         lastName: profile.user_metadata.lastName,
        //         address: profile.user_metadata.address,
        //         profilePicture: avatarUrl
        //     }
        // });

        // auth.on('profile_updated', () => {
        //     browserHistory.push('/profile');
        // });
    }

    updateProfileName(event) {
        const field = event.target.name;
        let newProfile = update(this.state.profile,
            {
                user_metadata: {
                    [field]: {$set: event.target.value}
                }
            }
        );
        //debugger;

        // update the local state
        return this.setState({profile: newProfile});
    }

    // Called when any field except State is updated
    updateProfileAddressField(event) {
        //debugger;
        const field = event.target.name;
        let newProfile = update(this.state.profile,
            {
                user_metadata: {
                    address: {
                        [field]: {$set: event.target.value}
                    }
                }
            }
        );

        // update the local state
        return this.setState({profile: newProfile});
    }

    updateProfileAddressState(event) {
        //debugger;
        let newProfile = update(this.state.profile,
            {
                user_metadata: {
                    address: {
                        'state': {$set: event.value}
                    }
                }
            }
        );

        return this.setState({profile: newProfile});
    }

    uploadAvatarImage() {

        //debugger;
        const {profile} = this.state;
        let pathObj = pathParse(this.state.avatarLocalFileName);
        let imgFile = profile.user_id.replace(/\|/g, '_') + pathObj.ext;  //`{profile.email.${pathObj.ext}`;
        let imgPath = `app_images/avatars/${imgFile}`;
        let localAvatarFile = this.state.localAvatarFile;

        // configure AWS client
        //AWS.config.loadFromPath('../../../awsconfig.json');
        AWS.config.update({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        );

        // Create an S3 client
        let s3 = new AWS.S3();

        //upload file to AWS bucket
        let bucketName = 'lifescihub';
        let {auth} = this.props;

        s3.createBucket({Bucket: bucketName}, function () {
            let deleteParams = {Bucket: bucketName, Key: imgPath};

            // there is no "replace" function, so delete any existing image file first
            s3.deleteObject(deleteParams, function (err, data) {
                if (err)
                    console.log(err);
                // else {
                //     // need to update profile here, even though we are updating again below.
                //     // this is because, if the imageURL is the same as the previous one, we
                //     // still need to fire the Profile Updated event.
                //     let nextProfile = {'user_metadata': {'profilePicture': ''}};
                //     auth.updateProfile(profile.user_id, nextProfile);
                //
                //     console.log("Successfully deleted image " + bucketName + "/" + imgPath);
                // }
            });

            // read the image file from local filesystem
            let reader = new FileReader();
            //debugger;
            reader.onload = function() {
                let params = {Bucket: bucketName, Key: imgPath, Body: reader.result};
               // debugger;
                s3.putObject(params, function (err, data) {
                    if (err)
                        console.log(err);
                    else {
                        console.log("Successfully uploaded data to " + bucketName + "/" + imgPath);
                        let rndQueryStr = '?random=' + new Date().getTime();    // required in order to fetch updated image with unchanged URL without refreshing the page
                        let avatarUrl = `https://s3.amazonaws.com/${bucketName}/${imgPath}${rndQueryStr}`;
                        auth.updateProfile(profile.user_id, {
                            user_metadata: {
                                profilePicture: avatarUrl
                            }
                        });
                    }
                });
            };
            reader.readAsArrayBuffer(localAvatarFile);
        });

    }

    render() {

        // listen to profile_updated events to update internal state
        // this.props.auth.on('profile_updated', (newProfile) => {
        //     this.setState({profile: newProfile});
        // });

        const { profile } = this.state;

        return (
            <div>
                <h3>Edit Profile</h3>
                <ProfileEdit
                    profile={profile}
                    updateProfileAddressField = {this.updateProfileAddressField}
                    updateProfileAddressState={this.updateProfileAddressState}
                    updateProfileName = {this.updateProfileName}
                    handleSubmit={this.handleSubmit}
                    avatarTimestamp={this.state.avatarTimestamp}
                    avatarStorageKey={this.state.avatarStorageKey}
                    handleAvatarChange={this.handleAvatarChange}
                />
            </div>``
        );
    }
}

ProfileEditPage.propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        profile: state.profile.toJS()
    };
}

function mapDispatchToProps(dispatch)
{
    //debugger;
    return {
        actions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
