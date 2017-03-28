let bodyParser = require("body-parser");
let express = require("express");
let router = express.Router();
let Question = new require("../models/Question");
let mongoose = require('mongoose');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

function nocache(req, res, next) {
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   res.header('Expires', '-1');
   res.header('Pragma', 'no-cache');
   next();
}

// Get a single question
router.get("/:questionId", function (req, res) {
   let qid = parseInt(req.params.questionId);
   Question.findOne({'id': qid})
      .exec(function (err, question) {
         if (err) {
            res.status(400);
            res.json({error: "Bad request."});
            return;
         }
         res.json({question: question});
      });
});

// Get all questions
router.get("/", nocache, function (req, res) {
   Question.find()
      .exec(function (err, questions) {
         if (err) {
            res.status(400);
            res.json({error: "Bad request."});
            return;
         }
         res.json({"questions": questions});
         //res.send(questions);
      });
});

// Create a new question
router.post("/", function (req, res) {
   let newQuestion = req.body;
   console.log("req.body: " + newQuestion);

   let qModel = new Question({...newQuestion});
   qModel.save(function (err, qModel) {
      if (err)
         return console.error(err);
      else
         res.json(qModel);
   });
});

// delete a question
router.delete("/:questionId", function (req, res) {
   let qid = req.params.questionId;
   console.log("qid: " + qid);
   Question.findOne({'_id': qid}).remove(function (err) {
      if (err) {
         res.status(400);
         res.json({error: "Bad request: " + err});
         return;
      }

      res.json({message: "Deleted question " + qid});
   });
});

// update a question
router.patch("/update/:questionId", function (req, res) {
   let qid = req.params.questionId;
   let updatedQuestion = req.body;

   Question.update({_id: qid}, {...updatedQuestion}, function (err, raw) {
      if (err) {
         res.status(400);
         res.json({error: "Bad request: " + err});
      }
      else {
         console.log('The raw response from Mongo was ', raw);
         //res.send("Updated question " + qid);
         res.json({message: "Updated question: " + qid});
      }
   });
});

// re-order questions
router.patch("/reorder", function (req, res) {
    let orderedQuestions =req.body;
    let bulk = Question.collection.initializeUnorderedBulkOp();
    orderedQuestions.forEach(keyVal => {
        bulk.find({'_id': mongoose.Types.ObjectId(keyVal.qId)}).update({$set: {index: keyVal.index}});
    });
    bulk.execute(function (err) {
        if (err) {
            res.status(400);
            res.json({error: "Failed to update question order: " + err});
            return;
        }

        res.json({message: "Updated question order"});
    });

});



module.exports = router;
