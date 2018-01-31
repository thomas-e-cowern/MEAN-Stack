var mongoose = require('mongoose');

careerSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.ObjectId, ref: "User"},
    websitename: {type : String, default: ""},
    url: {type : String, default: ""},
    lastsearched: {type : Date},
    numberapplied: {type : String, default: ""},
    contact: {type: String, default: ""},
    interviews: {type: String, default: ""},
    username: {type: String, default: ""},
    password: {type : String, default: ""}                    
});

module.exports = mongoose.model('Career', careerSchema);