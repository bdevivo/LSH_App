import {auth} from '../auth_utils/auth';
import AWS from 'aws-sdk';
const pathParse = require('path-parse');

// Avatar storage constants (using AWS S3)
const avatarStoragePath = 'app_images/avatars';
const avatarStorageBucketName = 'lifescihub';
const avatarUrlRoot = 'https://s3.amazonaws.com';




export default class ProfileApi {

    static getProfile() {
        return auth.getProfile();
    }

    static updateProfileUserName(first, middle, last) {
        auth.updateProfile({
            user_metadata: {
                firstName: first,
                middleInit: middle,
                lastName: last,
            }
        })
        .then(response => response.json())
        .then(newProfile => {
            if (newProfile.error) {
                console.log("ProfileApi.updateProfileUserName error: " + newProfile.error);
            }
            else {
                auth.setProfile(newProfile);   //update current profile in local storage, and emit an event
            }
        }, (error) => {
            console.log("ProfileApi.updateProfileUserName error: " + error);
        });
    }

    static updateProfileAddress(address) {
        auth.updateProfile({
            user_metadata: {
                address: {
                    street1: address.street1,
                    street2: address.street2,
                    city: address.city,
                    state: address.state,
                    country: address.country,
                    zip: address.zip
                }
            }
        })
        .then(response => response.json());
    }

    static updateProfileAvatar(user_id, avatarLocalFileName, avatarLocalFile)  // avatarLocalFile is a File object
    {
        let pathObj = pathParse(avatarLocalFileName);
        let imgFile = user_id.replace(/\|/g, '_') + pathObj.ext;
        let imgPath = `${avatarStoragePath}/${imgFile}`;

        // configure AWS client (we're using AWS S3 to store the images)
        AWS.config.update({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        );

        // Create an S3 client
        let s3 = new AWS.S3();

        //upload file to AWS bucket
        s3.createBucket({Bucket: avatarStorageBucketName}, function () {
            let deleteParams = {Bucket: avatarStorageBucketName, Key: imgPath};

            // there is no "replace" function, so delete any existing image file first
            s3.deleteObject(deleteParams, function (err, data) {
                if (err)
                    console.log(err);
            });

            // read the image file from local filesystem
            return new Promise(function (resolve, reject) {

                let reader = new FileReader();

                reader.onload = result => {
                    resolve(result);
                };

                reader.readAsArrayBuffer(avatarLocalFile);

            })
            .then((result) => {
                let params = {Bucket: avatarStorageBucketName, Key: imgPath, Body: result};
                return new Promise(function(resolve, reject) {
                    s3.putObject(params, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(data);
                        }
                    });
                });
            })
            .then((data) => {
                console.log("Successfully uploaded data to " + avatarStorageBucketName + "/" + imgPath);

                // update the profile with the new Avatar URL
                let rndQueryStr = '?random=' + new Date().getTime();    // required in order to fetch updated image with unchanged URL without refreshing the page
                let avatarUrl = `${avatarUrlRoot}/${avatarStorageBucketName}/${imgPath}${rndQueryStr}`;
                return auth.updateProfile(user_id, {
                    user_metadata: {
                        profilePicture: avatarUrl
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .then(response => response.json());
        });
    }

    static isAdmin()
    {
        return auth.isAdmin();
    }

    static isBuyer()
    {
        return auth.hasRole('buyer');
    }

    static hasRole(roleName)
    {
        return auth.hasRole(roleName);
    }

}







