var Users = require('../controllers/users'),
    Auth = require('../controllers/auth'),
    express = require('express');


module.exports = (app) => {
     app.get('/', Auth.middlewares.session);


    app.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: './public/html'
        })
    });

    app.get('/homepage', (req, res) => {
        res.sendFile('homepage.html', {
            root: './public/html'
        })
    });

    app.all('/api*', Auth.middlewares.session);

    //Routes for login/logout/register
    app.get('/logout', Auth.logout);
    app.post('/login', Auth.login);
    app.post('/register', Auth.register);    
    
    //Routes for user id and data
    app.get('/api/getUserId', Users.getUserID);
    app.get('/api/getUserData', Users.getUserData);
    app.put('/api/updateUserData', Users.updateUserData);
    
};