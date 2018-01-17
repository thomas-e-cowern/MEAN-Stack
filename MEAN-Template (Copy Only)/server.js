var express = require("express");

var app = express();

var mongojs = require("mongojs");

var bodyParser = require("body-parser");

var db = mongojs('dummydata', ["dummydata"]);

var port = process.env.port || 8080;

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

//registration

app.post("/register", (req, res) => {
    console.log("Register: ", req.body);
});


app.get("/dummydata", (req, res) => {
    console.log("Recieved get request");

    db.dummydata.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});
    
app.post("/dummydata", (req, res) => {
   console.log(req.body); 
    db.dummydata.insert(req.body, function (err, doc) {
        res.json(doc);
    })
});

app.delete("/dummydata/:id", (req, res) => {
    var id = req.params.id;
    console.log(id);
    db.dummydata.remove({_id: mongojs.ObjectId(id)}, function (err,doc) {
        res.json(doc);
    })
});

app.get("/dummydata/:id", (req, res) => {
    var id = req.params.id;
    console.log(id);
    db.dummydata.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc)
    })
});

app.put("/dummydata/:id", (req, res) => {
    var id = req.params.id;
    console.log(req.params);
    console.log("ID: " + id);
    console.log("Name: " + req.body.Name);
    db.dummydata.findAndModify({query: {_id: mongojs.ObjectId(id)}, update: {$set: {Name:req.body.Name}}, new: true}, function (err, doc) {
        res.json(doc);
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server error: " + err);
        process.exit();
    } else {
        console.log("Listenng on server at port " + port)
    }
});


