var mongoose = require('mongoose');

 resumeSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: "User"},
    jobtitle:{type : String, default: ""},
    joblocation : {type : String, default: ""},
    company : {type : String, default: ""},
    companyurl : {type : String, default: ""},
    contactname: {type: String, default: ""},
    contactphone: {type : String, default: ""},
    contactemail: {type : String, default: ""},
    datesubmitted: {type : String, default: ""},
    notes: {type : String, default: ""},
    followupdate: {type : String, default: ""}
});

module.exports = mongoose.model('Resume', resumeSchema);

