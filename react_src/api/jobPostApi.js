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

   static getJobSummariesForUser(userId) {
       //FOR TESTING ONLY
       return new Promise((resolve, reject) => {
           resolve({
               userJobs: []
           });
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
