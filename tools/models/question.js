let mongoose = require("mongoose");
let questionSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        name: { type: String, required: true, unique: true},
        text: { type: String, required: true },
        displayType: { type: Number },
        answerType: { type: Number },
        topLevel: {type: Boolean },
        required: { type: Boolean }
    }
);

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//
//      var questionSchema = new mongoose.Schema(
//         { name: 'string' }
//     );
//
//     Question = mongoose.Model("Question", questionSchema);
//
// });


// questionSchema.methods.Name = function() {
//     return this.name;
// };


var Question = mongoose.model("Question", questionSchema);

//export default Question;
module.exports = Question;