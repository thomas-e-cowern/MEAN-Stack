var Career = require('../models/careerModel');

function addCareer (req, res) {
    console.log('hit addCareer');
    console.log("addCareer: ", req.body);
    console.log('user: ', req.session.userId);
    var user = req.session.userId;
    var newCareer = req.body;
    newCareer.userid = user

    var newCareer = new Career(newCareer);

    newCareer.save((err, doc) => {
        if (err) {
            console.log('Error saving addCareer');
            return res.send(err);
        } else {
            console.log('Success saving addCareer');
            res.send(doc)
        }
    });

};

function getCareer (req, res) {
    console.log('hit getCareer');
    // get One
    console.log('Get function from getCareer')
    console.log('Userid: ', req.session.userId);

    if (req.params.id) {
        console.log('Hit get one...');
        Career.findOne({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from getCareer')
                return res.send(err);
            }
            if (!document) {
                return res.send('No one with that id')
            }
            console.log("getResume Doc: ", document);
            res.status(200).send(document);

        });
    }
    // get Many
    else {
        console.log('getCareer all ')
        Career.find({
            userid: req.session.userId
        }, (err, document) => {
            // res.send(err || documents)
            if (err) {
                return res.send(err);
            }
            res.send(document);
        });
    }
};

function updateCareer (req, res) {
    console.log('hit updateCareer');
    console.log('id: ', req.body._id);
    console.log('career: ', req.body)

    Career.findByIdAndUpdate({
        _id: req.body._id
    }, {
        websitename: req.body.websitename,
        url: req.body.url,
        lastsearched: req.body.lastsearched,
        numberapplied: req.body.numberapplied,
        contact: req.body.contact,
        interviews: req.body.interviews,
        username: req.body.username,
        password: req.body.password
    }, {
        new: true
    }, (err, document) => {
        // res.send(err || documents)
        if (err) {
            res.send(err);
        } else {
            console.log("DOCUMENT from upateCareer", document);
            res.status(200).send(document);
        }
    });
};

function removeCareer (req, res) {
    console.log('removeCareer');
        if (req.params.id) {
        Career.remove({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from removeCareer')
                return res.send(err);
            }
            if (!document) {
                return res.send('removeCareer: no one with that id')
            }
            res.status(200).send(document);
        });
    }
}

module.exports = {
    
    addCareer: addCareer,
    getCareer: getCareer,
    updateCareer: updateCareer,
    removeCareer: removeCareer
    
}