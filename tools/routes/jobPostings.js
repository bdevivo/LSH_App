let bodyParser = require("body-parser");
let express = require("express");
let router = express.Router();
let JobPosting = new require("../models/JobPosting");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

function nocache(req, res, next) {
   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
   res.header('Expires', '-1');
   res.header('Pragma', 'no-cache');
   next();
}


// Get all job postings for user
router.get("/:userId", nocache, function (req, res) {
   let userId = req.params.userId;
   console.log("userId: " + userId);
   JobPosting.find({'createdBy': userId})
      .exec(function (err, jobPostings) {
         if (err) {
            res.status(400);
            res.json({error: "Bad request."});
            console.log("ERROR in Get All Job Postings for User: ");
            console.error(err);
         }
         res.json({"jobPostings": jobPostings});
      });
});

// Create a new job posting
router.post("/", function (req, res) {
   let newJobPosting = req.body;
   console.log("req.body: " + newJobPosting);

   let jpModel = new JobPosting({...newJobPosting});
   jpModel.save(function (err, qSet) {
      if (err)
         return console.error(err);
      else
         res.json(qSet);
   });
});

// delete a job posting
router.delete("/:jobPostingId", function (req, res) {
   let jpId = req.params.jobPostingId;
   console.log("jpId: " + jpId);
   JobPosting.findOne({'_id': jpId}).remove(function (err) {
      if (err) {
         res.status(400);
         res.json({error: "Bad request: " + err});
         return;
      }

      res.json({message: "Deleted job posting " + jpId});
   });
});

// update a job posting
router.patch("/:jobPostingId", function (req, res) {
   let jpId = req.params.jobPostingId;
   let updatedJobPosting = req.body;

   JobPosting.update({_id: jpId}, {...updatedJobPosting}, function (err, raw) {
      if (err) {
         res.status(400);
         res.json({error: "Bad request: " + err});
      }
      else {
         console.log('The raw response from Mongo was ', raw);
         res.json({message: "Updated job posting: " + jpId});
      }
   });
});

module.exports = router;
