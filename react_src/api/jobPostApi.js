import 'whatwg-fetch';

class JobPostApi {

    static saveJob(jobPosting) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            delete jobPosting._id;    // strip off the temporary id
            const body = JSON.stringify(jobPosting);

            return fetch('/api/jobPostings', {
                method: 'POST',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(jobPosting => {
                    resolve(jobPosting);
                })
                .catch(err => {
                    alert("Error creating new job posting: " + err);
                    reject();
                });
        });
    }

    static deleteJob(jobId) {
        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            return fetch(`/api/jobPostings/${jobId}`, {
                method: 'DELETE',
                headers: headers
            })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    alert("Error deleting job posting: " + err);
                    reject();
                });
        });
    }

    static updateJob(jobPosting) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            const body = JSON.stringify(jobPosting);

            return fetch(`/api/jobPostings/${jobPosting._id}`, {
                method: 'PATCH',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    alert("Error updating job posting: " + err);
                    reject();
                });
        });
    }

    static getJobSummariesForUser(userId) {
        return new Promise((resolve, reject) => {

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-control': 'no-cache'
            };

            return fetch(`/api/jobPostings/${userId}`, {
                method: 'GET',
                headers: headers
            })
                .then((response) => {
                    return response.json();
                })
                .then(qSets => {
                    resolve(qSets);
                })
                .catch(
                    (err) => {
                        alert("Error getting question sets: " + err);
                        reject();
                    }
                );
        });
    }

    static getJobDetails(jobId) {
        //FOR TESTING ONLY
        return new Promise((resolve, reject) => {
            resolve({
                jobPost: {}
            });
        });
    }

}

export default JobPostApi;
