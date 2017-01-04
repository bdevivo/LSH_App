let mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.Promise = require('es6-promise').Promise;

let Question;
let questionSchema;
let db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {

questionSchema = new Schema(
    {
        text: { type: String, required: true },
        textForResources: { type: String },
        index: { type: Number },
        displayType: { type: String },
        answerType: { type: String },
        selectOptionItems: [{
            text: { type: String },
            id: { type: String },
            index: { type: Number }
        }],
        textOptions: {
            width: { type: Number },
            multiLine: { type: Boolean },
            numeric: { type: Boolean }
        },
        booleanOptions: {
            yesText: { type: String },
            noText: { type: String }
        },
        dateType: { type: String }
    }
);

Question = mongoose.model("Question", questionSchema);
module.exports = Question;




