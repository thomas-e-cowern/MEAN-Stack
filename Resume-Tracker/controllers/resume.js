var Resume = require('../models/resumeModel');

function updateResume (req, res) {
    console.log('Hit update');
    console.log('id: ', req.body._id);
    console.log('resume: ', req.body)

    Resume.findByIdAndUpdate({
        _id: req.body._id
    }, {
        jobtitle: req.body.jobtitle,
        joblocation: req.body.joblocation,
        company: req.body.company,
        companyurl: req.body.companyurl,
        contactname: req.body.contactname,
        contactphone: req.body.contactphone,
        contactemail: req.body.contactemail,
        datesubmitted: req.body.datesubmitted,
        notes: req.body.notes,
        followupdate: req.body.followupdate
    }, {
        new: true
    }, (err, document) => {
        // res.send(err || documents)
        if (err) {
            res.send(err);
        } else {
            console.log("DOCUMENT from upateResume", document);
            res.status(200).send(document);
        }
    });
}

function removeResume (req, res) {
    console.log('hit removeResume', req.params.id)

    if (req.params.id) {
        Resume.remove({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from removeResume')
                return res.send(err);
            }
            if (!document) {
                return res.send('removeResume: no one with that id')
            }
            res.status(200).send(document);
        });
    }
}

function getResume (req, res) {
    // get One
    console.log('Get function from edit')
    console.log('Userid: ', req.session.id);

    if (req.params.id) {
        console.log('Hit get one...');
        Resume.findOne({
            _id: req.params.id
        }, (err, document) => {
            if (err) {

                console.log('Error from getResume')
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
        console.log('getResume all ')
        Resume.find({
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

function addResume(req, res) {

    console.log("addResume: ", req.body);
    console.log('user: ', req.session.userId); 
    var user = req.session.userId;
    var newResume = req.body;
    newResume.userid = user
    
    var newResume = new Resume (newResume);
    
    newResume.save((err, doc) => {
       if (err) {
           console.log('Error saving addResume');
           return res.send(err);
       } else {
           console.log('Success saving addResume');
           res.send(doc)
       }
    });

}


module.exports = {

    getResume: getResume,
    updateResume: updateResume,
    removeResume: removeResume,
    addResume: addResume

}
