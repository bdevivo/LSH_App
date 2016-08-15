import path from 'path';

var express = require("express");
var Question = new require("./models/question");
var router = express.Router();

router.get("/question/:questionId", function(req, res) {
    var qid = parseInt(req.params.questionId);
    Question.findOne({'id': qid})
        .exec(function(err, question) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request." });
                return;
            }
            res.json({question: question });
        });
});

router.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../src/index.html'));
});

module.exports = router;
