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
    let uid = parseInt(req.params.userId);
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

// Get a single user by Auth0 ID
router.get("/auth0/:userId", function (req, res) {
    let auth0_id = req.params.userId;
    console.log("auth0_id: " + auth0_id);
    User.findOne({'auth0_id': auth0_id})
        .exec(function (err, user) {
            if (err) {
                res.status(400);
                res.json({error: "Bad request."});
                return;
            }
            res.json({"user": user});
        });
});

// Create a new user
router.post("/", function (req, res) {
    let auth0_id = req.body.auth0_id;

    let uModel = new User({
        'auth0_id': auth0_id
    });

    uModel.save(function (err, uModel) {
        if (err)
            return console.error(err);
        else
            res.json(uModel);
    });


});

// Add or update user name
router.put("/name", function (req, res) {
    let user = req.body;

    let {_id, name} = user;

    if (!_id) throw new Error("Update name: missing user id");

    // use blank fields for default
    name = name || {
            first: '',
            middle: '',
            last: ''
        };

    User.update({_id: _id}, {user_name: name}, function (err, raw) {
        if (err)
            return handleError(err);
        else {
            console.log('Update user name response ', raw);
            res.json({message: `Updated user name to ${name.first} ${name.last}`});
        }

    });
});

// Add or update avatar
router.put("/avatar", function (req, res) {
    let {_id, avatarUrl} = req.body;

    if (!_id) throw new Error("Update name: missing user id");

    User.update({_id: _id}, {avatarUrl: avatarUrl}, function (err, raw) {
        if (err)
            return handleError(err, res);
        else {
            console.log('Update avatar response ', raw);
            res.json({message: `Updated avatar for user ${_id}`});
        }
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

// Add Education record
router.put("/education", function (req, res) {
    let profile = req.body;

    let {_id, edu} = profile;

    if (!_id) throw new Error("Add Education: missing user id");

    // use blank fields for default
    edu = edu || {
            school: '',
            fromYear: '',
            toYear: '',
            degree: '',
            fieldsOfStudy: '',
            description: '',
            gpa: ''
        };

    User.update(
        {_id: _id},
        {$push: {education: edu}},
        function (err, raw) {
            if (err)
                return handleError(err);
            else {
                console.log('The raw response from Mongo was ', raw);
                res.send("success");
        }
    });
});

// Add Employment record
router.put("/employment", function (req, res) {
    let profile = req.body;

    let {_id, emp} = profile;

    if (!_id) throw new Error("Add Employment: missing user id");

    // use blank fields for default
    emp = emp || {
            company: '',
            location: '',
            title: '',
            fromMonth: '',
            fromYear: '',
            toMonth: '',
            toYear: '',
            isCurrent: '',
            description: ''
        };

    User.update(
        {_id: _id},
        {$push: {employment: emp}},
        function (err, raw) {
            if (err)
                return handleError(err);
            else {
                console.log('The raw response from Mongo was ', raw);
                res.send("success");
            }
        });
});


function handleError(err, res) {
    console.error(err);
    res.status(400);
    res.json({error: "Bad request: " + err});
}



module.exports = router;
