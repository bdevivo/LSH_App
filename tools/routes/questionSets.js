let bodyParser = require("body-parser");
let express = require("express");
let router = express.Router();
let QuestionSet = new require("../models/QuestionSet");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}


// Get all question sets
router.get("/", nocache, function (req, res) {
    QuestionSet.find()
        .exec(function (err, questionSets) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request."});
                return;
            }
            res.json({"questionSets": questionSets});
        });
});

// Create a new question set
router.post("/", function (req, res) {
    let newQuestionSet = req.body;
    console.log("req.body: " + newQuestionSet);

    let qsModel = new QuestionSet({...newQuestionSet});
    qsModel.save(function (err, qSet) {
        if (err)
            return console.error(err);
        else
            res.json(qSet);
    });
});

// delete a question set
router.delete("/:questionSetId", function (req, res) {
    let qsId = req.params.questionSetId;
    console.log("qsId: " + qsId);
    QuestionSet.findOne({'_id': qsId}).remove(function (err) {
        if (err) {
            res.status(400);
            res.json({error: "Bad request: " + err});
            return;
        }

        res.json({message: "Deleted question set " + qsId});
    });
});

// update a question set
router.patch("/:questionSetId", function (req, res) {
    let qsId = req.params.questionSetId;
    let updatedQuestionSet = req.body;

    QuestionSet.update({_id: qsId}, {...updatedQuestionSet}, function (err, raw) {
        if (err) {
            res.status(400);
            res.json({error: "Bad request: " + err});
        }
        else {
            console.log('The raw response from Mongo was ', raw);
            res.json({message: "Updated question set: " + qsId});
        }
    });
});

module.exports = router;
