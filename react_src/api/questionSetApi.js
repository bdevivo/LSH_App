import 'whatwg-fetch';

class QuestionSetApi {

   static addQuestionSet(qSet) {

      //FOR TESTING ONLY
      return new Promise((resolve, reject) => {
         qSet._id = Math.floor(Math.random() * 1000);
         resolve(qSet);

      });


      // return new Promise((resolve, reject) => {
      //    const headers = {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //    };
      //
      //    delete qSet._id;    // strip off the temporary id
      //    const body = JSON.stringify(qSet);
      //
      //    return fetch('/api/questionQuestionSets', {
      //       method: 'POST',
      //       headers: headers,
      //       body: body
      //    })
      //       .then(response => {
      //          return response.json();
      //       })
      //       .then(q => {
      //          resolve(q);
      //       })
      //       .catch(err => {
      //          alert("Error creating new question panel: " + err);
      //          reject();
      //       });
      // });
   }

   static updateQuestionSet(qSet) {

      // FOR TESTING ONLY
      return new Promise((resolve, reject) => {
         resolve(qSet);

      });

      // return new Promise((resolve, reject) => {
      //    const headers = {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //    };
      //
      //    const body = JSON.stringify(qSet);
      //
      //    return fetch(`/api/questionQuestionSets/${qSet._id}`, {
      //       method: 'PATCH',
      //       headers: headers,
      //       body: body
      //    })
      //       .then(response => {
      //          return response.json();
      //       })
      //       .then(response => {
      //          resolve(response);
      //       })
      //       .catch(err => {
      //          alert("Error updating question panel: " + err);
      //          reject();
      //       });
      // });
   }

   static getAllQuestionSets() {

      return new Promise((resolve, reject) => {
         resolve([]);

      });

      // return new Promise((resolve, reject) => {
      //
      //    const headers = {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //       'Cache-control': 'no-cache'
      //    };
      //
      //    return fetch('/api/questionQuestionSets', {
      //       method: 'GET',
      //       headers: headers
      //    })
      //       .then((response) => {
      //          return response.json();
      //       })
      //       .then(panels => {
      //          resolve(panels);
      //       })
      //       .catch(
      //          (err) => {
      //             alert("Error getting question panels: " + err);
      //             reject();
      //          }
      //       );
      // });
   }

   static deleteQuestionSet(panelId) {

      return new Promise((resolve, reject) => {

         resolve(panelId);
      });

         // const headers = {
         //    'Accept': 'application/json',
         //    'Content-Type': 'application/json'
         // };
      //
      //    return fetch(`/api/questionQuestionSets/${panelId}`, {
      //       method: 'DELETE',
      //       headers: headers
      //    })
      //       .then(response => {
      //          return response.json();
      //       })
      //       .then(response => {
      //          resolve(response);
      //       })
      //       .catch(err => {
      //          alert("Error deleting question panel: " + err);
      //          reject();
      //       });
      // });
   }

}

export default QuestionSetApi;
