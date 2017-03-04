import 'whatwg-fetch';

class JobPostApi {

    static saveJob(jobPosting) {

        //FOR TESTING ONLY
        return new Promise((resolve, reject) => {
            jobPosting._id = Math.floor(Math.random() * 1000);
            resolve(jobPosting);

        });
    }

    static updateJob(jobPosting) {

        //FOR TESTING ONLY
        return new Promise((resolve, reject) => {
            resolve(jobPosting);

        });
    }

    static postJob(jobPosting) {

        //FOR TESTING ONLY
        return new Promise((resolve, reject) => {
            if (!jobPosting._id) {
                jobPosting._id = Math.floor(Math.random() * 1000);
            }

            resolve(jobPosting);

        });

        // return new Promise((resolve, reject) => {
        //     const headers = {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     };
        //
        //     delete qSet._id;    // strip off the temporary id
        //     const body = JSON.stringify(qSet);
        //
        //     return fetch('/api/questionSets', {
        //         method: 'POST',
        //         headers: headers,
        //         body: body
        //     })
        //         .then(response => {
        //             return response.json();
        //         })
        //         .then(qSet => {
        //             resolve(qSet);
        //         })
        //         .catch(err => {
        //             alert("Error creating new question set: " + err);
        //             reject();
        //         });
        // });
    }

    static cancelJob(jobPosting) {

        //FOR TESTING ONLY
        return new Promise((resolve, reject) => {
            resolve(jobPosting);
        });


    }

}
