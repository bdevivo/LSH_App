import * as Auth from '../auth_utils/auth';



export default class ProfileApi {

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



    static hasRole(roleName) {
        return Auth.hasRole(roleName);
    }

}







