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

    static updateJob(jobPosting) {

        //FOR TESTING ONLY
        return new Promise((resolve, reject) => {
            resolve(jobPosting);

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
