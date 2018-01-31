var Interview = require('../models/interviewModel');

function addInterview(req, res) {
    console.log('Hit addInterview');
    console.log("addInter: ", req.body);
    console.log('user: ', req.session.userId);
    var user = req.session.userId;
    var newInterview = req.body;
    newInterview.userid = user

    var newInterview = new Interview(newInterview);

    newInterview.save((err, doc) => {
        if (err) {
            console.log('Error saving addInterview');
            return res.send(err);
        } else {
            console.log('Success saving addInterview');
            res.send(doc)
        }
    });

};

function getInterview(req, res) {
    console.log('hit getInterview');
    // get One
    console.log('Get function from getInterview')
    console.log('Userid: ', req.session.userId);

    if (req.params.id) {
        console.log('Hit get one...');
        Interview.findOne({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from getInterview')
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
        console.log('getInterview all ')
        Interview.find({
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

function updateInterview(req, res) {
    console.log('hit updateInt');
    console.log('id: ', req.body._id);
    console.log('interview: ', req.body)

    Interview.findByIdAndUpdate({
        _id: req.body._id
    }, {
        interviewdate: req.body.interviewdate,
        interviewername: req.body.interviewername,
        company: req.body.company,
        interviewertitle: req.body.interviewertitle,
        interviewaddress: req.body.interviewaddress,
        mailingaddress: req.body.mailingaddress,
        thankyoudate: req.body.thankyoudate,
        notes: req.body.notes
    }, {
        new: true
    }, (err, document) => {
        // res.send(err || documents)
        if (err) {
            res.send(err);
        } else {
            console.log("DOCUMENT from upateInterview", document);
            res.status(200).send(document);
        }
    });
};

function removeInterveiw(req, res) {
    console.log('hit removeInt');
    if (req.params.id) {
        Interview.remove({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from removeInterview')
                return res.send(err);
            }
            if (!document) {
                return res.send('removeInterview: no one with that id')
            }
            res.status(200).send(document);
        });
    }
};

module.exports = {

    addInterview: addInterview,
    getInterview: getInterview,
    updateInterview: updateInterview,
    removeInterview: removeInterveiw

}
