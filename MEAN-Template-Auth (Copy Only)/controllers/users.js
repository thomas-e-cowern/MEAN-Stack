var Users = require('../models/userModel');

function getUserID(req, res) {
    console.log("req sess: ", req.session);
        console.log('user info: ', res.body)
    return res.send(req.session.userId);
}

function getUserData (req, res) {
    
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

module.exports = {
    getUserID: getUserID,
    getUserData: getUserData
}