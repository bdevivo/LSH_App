let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let QuestionSet;
let questionSetSchema;

questionSetSchema = new Schema(
    {
        index: {type: Number, required: true},
        questionPanelId: {type: String, required: true},
        qSetQuestions: [
            {
                id: {type: String},
                questionId: {type: String},
                conditionalQuestions: [
                    {
                        id: {type: String},
                        responseId: {type: String},
                        targetQuestionId: {type: String}
                    }
                ]
            }],
        addedBy: {type: String},
        addedDate: {type: Date},
        modifiedBy: {type: String},
        modifiedDate: {type: Date},
    }
);

QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
module.exports = QuestionSet;




