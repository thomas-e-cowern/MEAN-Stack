var express = require("express");
var app = express();

module.exports = (app) => {

    app.get("/dummydata", (req, res) => {
        console.log("Recieved get request");

        db.dummydata.find(function (err, docs) {
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
        db.dummydata.remove({
            _id: mongojs.ObjectId(id)
        }, function (err, doc) {
            res.json(doc);
        })
    });

    app.get("/dummydata/:id", (req, res) => {
        var id = req.params.id;
        console.log(id);
        db.dummydata.findOne({
            _id: mongojs.ObjectId(id)
        }, function (err, doc) {
            res.json(doc)
        })
    });

    app.put("/dummydata/:id", (req, res) => {
        var id = req.params.id;
        console.log(req.params);
        console.log("ID: " + id);
        console.log("Name: " + req.body.Name);
        db.dummydata.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    Name: req.body.Name
                }
            },
            new: true
        }, function (err, doc) {
            res.json(doc);
        });
    });

}
