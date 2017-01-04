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

   static deleteQuestion(question_id) {

      return new Promise((resolve, reject) => {
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         };

         return fetch(`/api/questions/${question_id}`, {
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
               alert("Error deleting question: " + err);
               reject();
            });
      });
   }

   static updateQuestion(question) {

      return new Promise((resolve, reject) => {
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         };

         const body = JSON.stringify(question);

         return fetch(`/api/questions/${question._id}`, {
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
               alert("Error updating question: " + err);
               reject();
            });
      });
   }


}

export default QuestionApi;
