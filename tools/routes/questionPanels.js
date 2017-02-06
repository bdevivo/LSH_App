let bodyParser = require("body-parser");
let express = require("express");
let router = express.Router();
let QuestionPanel = new require("../models/QuestionPanel");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}


// Get all panels
router.get("/", nocache, function (req, res) {
    QuestionPanel.find()
        .exec(function (err, panels) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request."});
                return;
            }
            res.json({"questionPanels": panels});
        });
});

// Create a new panel
router.post("/", function (req, res) {
    let newQuestionPanel = req.body;
    console.log("req.body: " + newQuestionPanel);

    let qpModel = new QuestionPanel({...newQuestionPanel});
    qpModel.save(function (err, qpModel) {
        if (err)
            return console.error(err);
        else
            res.json(qpModel);
    });
});

// delete a panel
router.delete("/:panelId", function (req, res) {
    let qpid = req.params.panelId;
    console.log("qpid: " + qpid);
    QuestionPanel.findOne({'_id': qpid}).remove(function (err) {
        if (err) {
            res.status(400);
            res.json({error: "Bad request: " + err});
            return;
        }

        res.json({message: "Deleted question panel " + qpid});
    });
});

// update a panel
router.patch("/:panelId", function (req, res) {
    let qpid = req.params.panelId;
    let updatedQuestionPanel = req.body;

    QuestionPanel.update({_id: qpid}, {...updatedQuestionPanel}, function (err, raw) {
        if (err) {
            res.status(400);
            res.json({error: "Bad request: " + err});
        }
        else {
            console.log('The raw response from Mongo was ', raw);
            res.json({message: "Updated question panel: " + qpid});
        }
    });
});

module.exports = router;
