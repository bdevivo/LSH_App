import 'whatwg-fetch';




class QuestionApi {

    static addQuestion(question) {

        return new Promise((resolve, reject) => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            delete question._id;    // strip off the temporary id
            const body = JSON.stringify(question);

            return fetch('/api/questions', {
                method: 'POST',
                headers: headers,
                body: body
            })
                .then(response => {
                    return response.json();
                })
                .then(q => {
                    resolve(q);
                })
                .catch(err => {
                    alert("Error creating new question: " + err);
                    reject();
                });
        });
    }

    static getAllQuestions() {

        return new Promise((resolve, reject) => {

            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-control': 'no-cache'
            };

            return fetch('/api/questions', {
                method: 'GET',
                headers: headers
            })
                .then((response) => {
                    return response.json();
                    //resolve(response);
                })
                .then(questions => {
                    resolve(questions);
                })
                .catch(
                    (err) => {
                        alert("Error getting questions: " + err);
                        reject();
                    }
                );
        });
    }


}

export default QuestionApi;
