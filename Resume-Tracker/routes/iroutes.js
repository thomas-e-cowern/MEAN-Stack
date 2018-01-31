var Interview = require('../controllers/interview'),
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

//    //Routes for Interview CRUD operations
    app.get('/api/interview', Interview.getInterview); //Read
    app.get('/api/interview/:id', Interview.getInterview); //Read
    app.post('/api/interview', Interview.addInterview); //Create
    app.post('/api/interview/:id', Interview.removeInterview); //Delete
    app.put('/api/interview/', Interview.updateInterview); //update


}
