let mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.Promise = require('es6-promise').Promise;

let userSchema = new Schema(
    {
        auth0_id: { type: String},
        address: {
            street1: { type: String},
            street2: { type: String},
            city: { type: String},
            state: { type: String},
            country: { type: String},
            zip: { type: String}
        },
        education: [{
            school:{ type: String},
            fromYear: { type: Number },
            toYear: { type: Number },
            degree: { type: String},
            fieldsOfStudy: { type: String},
            description: { type: String},
            gpa: { type: String}
        }],
        employment: [{
            company:{ type: String},
            location:{ type: String},
            title:{ type: String},
            fromMonth: { type: Number },
            fromYear: { type: Number },
            toMonth: { type: Number },
            toYear: { type: Number },
            isCurrent: { type: Boolean},
            description: { type: String}
        }],
        skills: [{
            name: { type: String}
        }]
    }
);

let User = mongoose.model("User", userSchema);
module.exports = User;




