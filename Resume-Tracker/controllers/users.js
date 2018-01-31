var Users = require('../models/userModel');

function getUserID(req, res) {
    console.log("getUserID req sess: ", req.session);
    console.log('getUserID user info: ', res.body)
    return res.send(req.session.userId);
}

function getUserData(req, res) {

    console.log('Get User Data', req.session);

    if (req.session.userId) {

        console.log('user found')
        Users.findOne({
            _id: req.session.userId
        }, (err, document) => {
            if (err) {

                console.log('Error from getUserData')
                return res.send(err);
            }
            if (!document) {
                return res.send('getUserData one with that id')
            }
            console.log("getUserData Doc: ", document);
            res.status(200).send(document);

        });
    } else {
        console.log('No user found');
    }

}

function updateUserData (req, res) {
    console.log('Hit updateUserData');
    console.log('id: ', req.body._id);
    console.log('updateUserData: ', req.body)

    Users.findByIdAndUpdate({
        _id: req.body._id
    }, {
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate
    }, {
        new: true
    }, (err, document) => {
        // res.send(err || documents)
        if (err) {
            res.send(err);
        } else {
            console.log("DOCUMENT from upateUserData", document);
            res.status(200).send(document);
        }
    });
}



module.exports = {
    getUserID: getUserID,
    getUserData: getUserData,
    updateUserData: updateUserData
}
