import path from 'path';
import bodyParser from 'body-parser';

var express = require("express");
var Question = new require("./models/question");
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

// Get a single question
router.get("/questions/:questionId", function(req, res) {
    var qid = parseInt(req.params.questionId);
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
router.get("/questions", function(req, res) {
    Question.find()
        .exec(function(err, questions) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request." });
                return;
            }
            res.json({ question: questions });
        });
});

// Create a new question
router.post("/questions", function(req, res) {
    var newQuestion = req.body;
    new Question({
        name: newQuestion.name,
        text: newQuestion.text,
        displayType: newQuestion.displayType,
        answerType: newQuestion.answerType,
        topLevel: newQuestion.topLevel,
        required: newQuestion.required
    });
    Question.save()
        .exec(function(err) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request." });
            }
        });
});

router.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
});

module.exports = router;
