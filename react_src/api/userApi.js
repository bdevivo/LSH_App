import 'whatwg-fetch';
import AWS from 'aws-sdk';
const pathParse = require('path-parse');

// Avatar storage constants (using AWS S3)
const avatarStoragePath = 'app_images/avatars';
const avatarStorageBucketName = 'lifescihub';
const avatarUrlRoot = 'https://s3.amazonaws.com';

class ApiHelper {
    static readLocalFile(localFile) {
        return new Promise(function (resolve, reject) {

            let reader = new FileReader();

            reader.onload = e => {
                resolve(reader.result);
            };

            reader.readAsArrayBuffer(localFile);

        });
    }

    static uploadToAWS(s3, path, body) {
        let params = {Bucket: avatarStorageBucketName, Key: path, Body: body};
        //let error, fileData;

        return new Promise(function (resolve, reject) {
            s3.putObject(params, resolve);
        });
    }
}

export default class UserApi {

    static addUser(auth0_id) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            let user_data = {
                auth0_id: auth0_id
                // add the rest here
            };

            const body = JSON.stringify(user_data);

            return fetch('/api/users', {
                method: 'POST',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(user => {
                    resolve(user);
                })
                .catch(err => {
                    alert("Error getting user by auth id: " + err);
                    reject();
                });
        });
    }

    static getUserByAuth0Id(auth0_id) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-control': 'no-cache'
            };

            return fetch(`/api/users/auth0/${auth0_id}`, {
                method: 'GET',
                headers: headers
            })
                .then(response => {
                    //console.log("getUserByAuth0Id bodyUsed: " + response.bodyUsed);
                    return response.json();
                })
                .then(user => {
                    resolve(user);
                })
                .catch(err => {
                    alert("Error getting user by auth id: " + err);
                    reject();
                });
        });
    }

    static getUserNames(userIdList) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-control': 'no-cache'
            };

            let user_data = {
                idList: userIdList
            };

            const body = JSON.stringify(user_data);

            return fetch('/api/users/names', {
                method: 'POST',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(userNames => {
                    resolve(userNames);
                })
                .catch(err => {
                    alert("Error getting user names: " + err);
                    reject();
                });
        });
    }

    static updateUserName(user_id, first, middle, last) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            let user_data = {
                _id: user_id,
                name: {
                    first: first,
                    middle: middle,
                    last: last
                }
            };

            const body = JSON.stringify(user_data);

            return fetch('/api/users/name', {
                method: 'PUT',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    // TODO: examine response here
                    let user_name = user_data.name;
                    user_name.short = first;    // user first name for the "short name" field, instead of default emal address
                    resolve(user_name);
                })
                .catch(err => {
                    alert("Error updating user name: " + err);
                    reject();
                });
        });
    }

    static updateAvatar(user_id, avatarLocalFileName, avatarLocalFile)  // avatarLocalFile is a File object
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
        //let readLocalFile = this.readLocalFile;
        //let uploadToAWS = this.uploadToAWS;

        return new Promise((resolve, reject) => {

            //upload file to AWS bucket
            s3.createBucket({Bucket: avatarStorageBucketName}, function () {

                let deleteParams = {Bucket: avatarStorageBucketName, Key: imgPath};

                // there is no "replace" function, so delete any existing image file first
                s3.deleteObject(deleteParams, function (err, data) {
                    if (err)
                        console.log(err);
                });

                // read the image file from local filesystem
                return ApiHelper.readLocalFile(avatarLocalFile)
                    .then((result) => {
                        return ApiHelper.uploadToAWS(s3, imgPath, result);
                    })
                    .then(data => {
                        console.log("Successfully uploaded data to " + avatarStorageBucketName + "/" + imgPath);

                        // create unique Avatar URL
                        let rndQueryStr = '?random=' + new Date().getTime();    // required in order to fetch updated image with unchanged URL without refreshing the page
                        let avatarUrl = `${avatarUrlRoot}/${avatarStorageBucketName}/${imgPath}${rndQueryStr}`;
                        resolve(avatarUrl);
                    })
                    .catch(err => {
                        console.log("Error in profileApi.updateProfileAvatar: " + err);
                    });
            });
        });
    }





    static updateAvatarUrl(user_id, avatarUrl) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            let avatar_data = {
                _id: user_id,
                avatarUrl: avatarUrl
            };

            const body = JSON.stringify(avatar_data);

            return fetch('/api/users/avatar', {
                method: 'PUT',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    // TODO: examine response here
                    resolve(avatarUrl);
                })
                .catch(err => {
                    alert("Error updating avatarUrl: " + err);
                    reject();
                });
        });
    }

}
