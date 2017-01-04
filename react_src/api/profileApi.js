import * as Auth from '../auth_utils/auth';
import AWS from 'aws-sdk';
const pathParse = require('path-parse');

// Avatar storage constants (using AWS S3)
const avatarStoragePath = 'app_images/avatars';
const avatarStorageBucketName = 'lifescihub';
const avatarUrlRoot = 'https://s3.amazonaws.com';


export default class ProfileApi {

    static updateProfileUserName(first, middle, last) {

        // TODO: call REST endpoint to update db; return Promise

        // Auth.updateProfile({
        //      user_metadata: {
        //          firstName: first,
        //          middleInit: middle,
        //          lastName: last,
        //      }
        //  });
    }

    static updateProfileAddress(address) {
        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            let profile = {
                _id: Auth.getUserId(),
                address: address
            };

            const body = JSON.stringify(profile);

            return fetch('/api/users/address', {
                method: 'PUT',
                headers: headers,
                body: body
            })
                .then(response => resolve());
        });
    }

    static updateProfileEducation(education) {
        // TODO: call Mongo and update edu record
        return new Promise((resolve, reject) => {
            resolve(education);
        });
    }

    static addProfileEducation(education) {
        // TODO: call Mongo and add new edu record
        return new Promise((resolve, reject) => {
            education.id = Math.floor((Math.random() * 1000) + 1);  // for now, just assign random int btw 1 and 1000
            resolve(education);
        });
    }

    static removeProfileEducation(eduId) {
        // TODO: call Mongo and remove education record, then return updated list
        return new Promise((resolve, reject) => {
            resolve(eduId);
        });
    }

    static updateProfileEmployment(employment) {
        // TODO: call Mongo and update emp record
        return new Promise((resolve, reject) => {
            resolve(employment);
        });
    }

    static addProfileEmployment(employment) {
        // TODO: call Mongo and add new emp record
        return new Promise((resolve, reject) => {
            employment.id = Math.floor((Math.random() * 1000) + 1);  // for now, just assign random int btw 1 and 1000
            resolve(employment);
        });
    }

    static removeProfileEmployment(empId) {
        // TODO: call Mongo and remove emp record, then return updated list
        return new Promise((resolve, reject) => {
            resolve(empId);
        });
    }


    static updateProfileSkills(skills) {
        // TODO: call Mongo and update skills array record
        return new Promise((resolve, reject) => {
            resolve(skills);
        });
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

                reader.onload = e => {
                    resolve(reader.result);
                };

                reader.readAsArrayBuffer(avatarLocalFile);

            })
                .then((result) => {
                    let params = {Bucket: avatarStorageBucketName, Key: imgPath, Body: result};
                    let error, fileData;

                    return new Promise(function (resolve, reject) {
                        s3.putObject(params, resolve);
                        // s3.putObject(params, (err, data) => {
                        //     error = err;
                        //     fileData = data;
                        // });
                    });

                    // if (error) {
                    //     return Promise.reject(error);
                    // }
                    // else {
                    //     return Promise.resolve(fileData);
                    // }
                })
                .then(function (data) {
                    console.log("Successfully uploaded data to " + avatarStorageBucketName + "/" + imgPath);

                    // update the profile with the new Avatar URL
                    let rndQueryStr = '?random=' + new Date().getTime();    // required in order to fetch updated image with unchanged URL without refreshing the page
                    let avatarUrl = `${avatarUrlRoot}/${avatarStorageBucketName}/${imgPath}${rndQueryStr}`;

                    // TODO: call REST endpoint to update avatarURL; return Promise
                    // Auth.updateProfile({    // this will update the profile, set the new profile in local storage, and emit an event
                    //     user_metadata: {
                    //         profilePicture: avatarUrl
                    //     }
                    // });
                })
                .catch(err => {
                    console.log("Error in profileApi.updateProfileAvatar: " + err);
                });
        });
    }


    static hasRole(roleName) {
        return Auth.hasRole(roleName);
    }

}







