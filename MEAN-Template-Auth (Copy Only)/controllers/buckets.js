var Bucket = require('../models/bucketsModel');

function update(req, res) {
    console.log('Hit update');
    console.log('id: ', req.body._id);
    console.log('buketname: ', req.body.bucketname)

    Bucket.findByIdAndUpdate({_id: req.body._id}, {
        bucketname: req.body.bucketname
    }, {
        new: true
    }, (err, document) => {
        // res.send(err || documents)
        if (err) {
            res.send(err);
        } else {
            console.log("DOCUMENT from upate", document);
            res.status(200).send(document);
        }
    });
}

function remove(req, res) {
    console.log('hit remove', req.params.id)

    if (req.params.id) {
        Bucket.remove({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from remove')
                return res.send(err);
            }
            if (!document) {
                return res.send('No one with that id')
            }
//            console.log("Remove Doc: ", document);
            res.status(200).send(document);
        });
    }
}

function get(req, res) {
    // get One
    console.log('Get function from edit')

    if (req.params.id) {
        Bucket.findOne({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from get')
                return res.send(err);
            }
            if (!document) {
                return res.send('No one with that id')
            }
            console.log("Get Doc: ", document);
            res.status(200).send(document);

        });
    }
    // get Many
    else {
        console.log('All ')
        Bucket.find({
            userid: req.session.userId
        }, (err, document) => {
            // res.send(err || documents)
            if (err) {
                return res.send(err);
            }
            res.send(document);
        });
    }
}

function addBucket(req, res) {

    // console.log("addBucket", req.body);
    var user = req.session.userId;
    console.log("user: ", user);
    var bvar = req.body;
    bvar.userid = user;


    console.log("Edit Input haha: ", bvar);
    var newBucket = new Bucket(req.body);
    console.log("newBucket: ", newBucket);
    newBucket.save((err, doc) => {
        if (err) {
            return res.send(err);
        }
        res.send(doc);
        // res.redirect('/index');
        console.log(doc);
    });

}


module.exports = {

    get: get,
    update: update,
    remove: remove,
    addBucket: addBucket
    
}
