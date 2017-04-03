let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let JobPosting;
let jobPostingSchema;

jobPostingSchema = new Schema(
    {
        name: {type: String, required: true},
        draftQuestionAnswers: {type: Schema.Types.Mixed },
        questionAnswers: {type: Schema.Types.Mixed },
        orderedQuestions: {type: Array},
        status: {type: String, required: true},
        createdBy: {type: String},
        createdDate: {type: Date},
        postedBy: {type: String},
        postedDate: {type: Date},
        modifiedBy: {type: String},
        modifiedDate: {type: Date},
    }
);

JobPosting = mongoose.model("JobPosting", jobPostingSchema);
module.exports = JobPosting;
