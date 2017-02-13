import 'whatwg-fetch';

class QuestionSetApi {

    static addQuestionSet(qSet) {

        //FOR TESTING ONLY
        // return new Promise((resolve, reject) => {
        //    qSet._id = Math.floor(Math.random() * 1000);
        //    resolve(qSet);
        //
        // });

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            delete qSet._id;    // strip off the temporary id
            const body = JSON.stringify(qSet);

            return fetch('/api/questionSets', {
                method: 'POST',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(qSet => {
                    resolve(qSet);
                })
                .catch(err => {
                    alert("Error creating new question set: " + err);
                    reject();
                });
        });
    }

    static updateQuestionSet(qSet) {

        // FOR TESTING ONLY
        // return new Promise((resolve, reject) => {
        //    resolve(qSet);
        //
        // });

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            const body = JSON.stringify(qSet);

            return fetch(`/api/questionSets/${qSet._id}`, {
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
                    alert("Error updating question set: " + err);
                    reject();
                });
        });
    }

    static getAllQuestionSets() {

        // return new Promise((resolve, reject) => {
        //    resolve(
        //        {
        //            questionSets: []
        //        });
        // });

        return new Promise((resolve, reject) => {

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-control': 'no-cache'
            };

            return fetch('/api/questionSets', {
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

    static deleteQuestionSet(qSetId) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            return fetch(`/api/questionSets/${qSetId}`, {
                method: 'DELETE',
                headers: headers
            })

                .then(response => {
                    resolve(response);
                })
                .catch(err => {
                    alert("Error deleting question set: " + err);
                    reject();
                });
        });
    }
}

export default QuestionSetApi;
