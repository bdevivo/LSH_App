import delay from './delay';
//import Immutable from 'immutable';

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
                'Content-Type': 'application/json'
            };


            return fetch('/api/questions', {
                method: 'GET',
                headers: headers
            })
                .then(response => response.json())
                .then(questions =>
                {
                    resolve(questions);
                });
        });






        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //        // resolve(Immutable.fromJS(questions));
        //         resolve(questions);
        //     }, delay);
        // });
    }

    // static saveAuthor(author) {
    //     author = Object.assign({}, author); // to avoid manipulating object passed in.
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             // Simulate server-side validation
    //             const minAuthorNameLength = 3;
    //             if (author.firstName.length < minAuthorNameLength) {
    //                 reject(`First Name must be at least ${minAuthorNameLength} characters.`);
    //             }
    //
    //             if (author.lastName.length < minAuthorNameLength) {
    //                 reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
    //             }
    //
    //             if (author.id) {
    //                 const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
    //                 authors.splice(existingAuthorIndex, 1, author);
    //             } else {
    //                 //Just simulating creation here.
    //                 //The server would generate ids for new authors in a real app.
    //                 //Cloning so copy returned is passed by value rather than by reference.
    //                 author.id = generateId(author);
    //                 authors.push(author);
    //             }
    //
    //             resolve(author);
    //         }, delay);
    //     });
    // }
    //
    // static deleteAuthor(authorId) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             const indexOfAuthorToDelete = authors.findIndex(author => {
    //                 author.authorId == authorId;
    //             });
    //             authors.splice(indexOfAuthorToDelete, 1);
    //             resolve();
    //         }, delay);
    //     });
    // }
}

export default QuestionApi;
