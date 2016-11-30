let bodyParser = require("body-parser");
let express = require("express");
let router = express.Router();
let User = new require("../models/User");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


// Get all users
router.get("/", function(req, res) {
    User.find()
        .exec(function(err, users) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request." });
                return;
            }
            res.json({ "users": users });
        });
});

// Get a single user
router.get("/:userId", function (req, res) {
    let uid = parseInt(req.params.user_id);
    User.findOne({'id': uid})
        .exec(function (err, user) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request."});
                return;
            }
            res.json({user: user});
        });
});

// Create a new user
router.post("/", function (req, res) {
    let newUser = req.body;

    // let {address, education, employment, skills} = newUser;
    // address = address || {
    //         street1: '',
    //         street2: '',
    //         city: '',
    //         state: '',
    //         country: '',
    //         zip: ''
    //     };
    // education = education || [];
    // employment = employment || [];
    // skills = skills || [];
    //
    //
    // let addressModel = {
    //     street1: address.street1,
    //     street2: address.street2,
    //     city: address.city,
    //     state: address.state,
    //     country: address.country,
    //     zip: address.zip
    // };
    //
    // let educationModel = education.map(e => {
    //     return {
    //         school: e.school,
    //         fromYear: e.fromYear,
    //         toYear: e.toYear,
    //         degree: e.degree,
    //         fieldsOfStudy: e.fieldsOfStudy,
    //         description: e.description,
    //         gpa: e.gpa
    //     };
    // });
    //
    // let employmentModel = employment.map(e => {
    //     return {
    //         company: e.company,
    //         location: e.location,
    //         title: e.title,
    //         fromMonth: e.fromMonth,
    //         fromYear: e.fromYear,
    //         toMonth: e.toMonth,
    //         toYear: e.toYear,
    //         isCurrent: e.isCurrent,
    //         description: e.description
    //     };
    // });

    let uModel = new User({
        auth0_id: newUser.user_id
        // address: addressModel,
        // education: educationModel,
        // employment: employmentModel,
        // skills: skills
    });

    uModel.save(function (err, uModel) {
        if (err)
            return console.error(err);
        else
            res.json(uModel);
    });


});

// Add or update address
router.put("/address", function (req, res) {
    let profile = req.body;

    let {_id, address} = profile;

    if (!_id) throw new Error("Update address: missing user id");

    // use blank fields for default
    address = address || {
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        };

    User.update({_id: _id}, {address: address}, function (err, raw) {
        if (err)
            return handleError(err);
    else {
            console.log('The raw response from Mongo was ', raw);
            res.send("success");
        }

    });


});


function handleError(err) {
    // throw error here?
    console.error(err);
}



module.exports = router;
