let mongoose = require("mongoose");
var Schema = mongoose.Schema;



var Question;
var questionSchema;
var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {

questionSchema = new Schema(
    {
        name: { type: String, required: true, unique: true},
        text: { type: String, required: true },
        displayType: { type: String },
        topLevel: {type: Boolean },
        answerType: { type: String },
        selectionOptions: { type: Array },
        textOptions: {
            width: { type: Number },
            multiline: { type: Boolean },
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

//});


