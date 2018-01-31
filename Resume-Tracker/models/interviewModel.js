var mongoose = require('mongoose');

interviewSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: "User"},
    interviewdate: {type : Date},
    interviewername: {type : String, default: ""},
    interviewertitle: {type : String, default: ""},
    company: {type : String, default: ""},
    interviewaddress: {type: String, default: ""},
    mailingaddress: {type: String, default: ""},
    thankyoudate: {type: Date},
    notes: {type : String, default: ""}                    
});

module.exports = mongoose.model('Interview', interviewSchema);