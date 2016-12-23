import 'whatwg-fetch';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const questions = [
    {
        id: 1,
        name: 'Question 1',
        visible: true

    },
    {
        id: 2,
        name: 'Question 2',
        visible: false
    },
    {
        id: 3,
        name: 'Question 3',
        visible: false
    }
];

//This would be performed on the server in a real app. Just stubbing in.
// const generateId = (author) => {
//     return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
// };

class QuestionApi {

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
