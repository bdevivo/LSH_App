let bodyParser = require("body-parser");
let express = require("express");
let router = express.Router();
let Question = new require("../models/Question");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

// Get a single question
router.get("/:questionId", function(req, res) {
    let qid = parseInt(req.params.questionId);
    Question.findOne({'id': qid})
        .exec(function(err, question) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request." });
                return;
            }
            res.json({ question: question });
        });
});

// Get all questions
router.get("/", function(req, res) {
    Question.find()
        .exec(function(err, questions) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request." });
                return;
            }
            res.json({ "questions": questions });
        });
});

// Create a new question
router.post("/", function(req, res) {
    let newQuestion = req.body;
    console.log("req.body: " + newQuestion);
    console.log("id: " + newQuestion.id + "  name: " + newQuestion.name);
    let qModel = new Question({
        name: newQuestion.name,
        text: newQuestion.text,
        displayType: newQuestion.displayType,
        answerType: newQuestion.answerType,
        selectionOptions: newQuestion.selectionOptions,
        textOptions: newQuestion.textOptions,
        topLevel: newQuestion.topLevel,
        required: newQuestion.required
    });
    qModel.save(function (err, qModel) {
        if (err)
            return console.error(err);
        else
            res.json(qModel);
    });

    // ()
    //     .exec(function(err) {
    //         if (err) {
    //             res.status(400);
    //             res.json({error: "Bad request." });
    //         }
    //     });
});



module.exports = router;
