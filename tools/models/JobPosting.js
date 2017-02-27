let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let JobPosting;
let jobPostingSchema;

jobPostingSchema = new Schema(
    {
        questionAnswers:
            {
                questionId: {type: String, required: true},
                questionAnswer: {type: Schema.Types.Mixed }
            },
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
