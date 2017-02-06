let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let QuestionPanel;
let questionPanelSchema;

questionPanelSchema = new Schema(
    {
        index: { type: Number, required: true },
        name: { type: String, required: true },
        header: { type: String },
        subheader: { type: String },
        nextButtonText: { type: String },
        backButtonText: { type: String },
        defaultAction: {
            action: { type: String },
            target: { type: String },
        },
        conditionalActions: [
            {
                id: {type: String},
                questionId: {type: String},
                questionResponseId: {type: String},
                action: {type: String},
                targetPanelId: {type: String}
            }],
        addedBy: { type: String },
        addedDate: {type: Date },
        modifiedBy: { type: String },
        modifiedDate: {type: Date },
    }
);

QuestionPanel = mongoose.model("QuestionPanel", questionPanelSchema);
module.exports = QuestionPanel;




