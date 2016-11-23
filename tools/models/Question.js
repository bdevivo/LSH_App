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
        name: { type: String, required: true, unique: true},
        text: { type: String, required: true },
        displayType: { type: String },
        topLevel: {type: Boolean },
        answerType: { type: String },
        selectionOptions: [String],
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




