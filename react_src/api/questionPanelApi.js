import 'whatwg-fetch';

class QuestionPanelApi {

   static addPanel(qPanel) {

      // FOR TESTING ONLY
      return new Promise((resolve, reject) => {
         qPanel._id = Math.floor(Math.random() * 1000);
         resolve(qPanel);

      });


      // return new Promise((resolve, reject) => {
      //    const headers = {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //    };
      //
      //    delete questionPanel._id;    // strip off the temporary id
      //    const body = JSON.stringify(questionPanel);
      //
      //    return fetch('/api/questionPanels', {
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

   static updatePanel(qPanel) {

      // FOR TESTING ONLY
      return new Promise((resolve, reject) => {
         resolve(qPanel);

      });

      // return new Promise((resolve, reject) => {
      //    const headers = {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //    };
      //
      //    const body = JSON.stringify(questionPanel);
      //
      //    return fetch(`/api/questionPanels/${questionPanel._id}`, {
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

   static getAllPanels() {

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
      //    return fetch('/api/questionPanels', {
      //       method: 'GET',
      //       headers: headers
      //    })
      //       .then((response) => {
      //          return response.json();
      //          //resolve(response);
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

   static deleteQuestionPanel(questionPanel_id) {

      return new Promise((resolve, reject) => {
         const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         };

         return fetch(`/api/questionPanels/${questionPanel_id}`, {
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
               alert("Error deleting question panel: " + err);
               reject();
            });
      });
   }




}

export default QuestionPanelApi;
