import 'whatwg-fetch';

class QuestionGridApi {


    static getAllQuestionAnswers() {

        return new Promise((resolve, reject) => {
           resolve(
               {
                   questionGrids: {
                       question_grid_job_posting: {
                           questionAnswers:{}
                       },
                       question_grid_user_profile: {
                           questionAnswers:{}
                       }
                   }
               });
        });


    }


}

export default QuestionGridApi;
