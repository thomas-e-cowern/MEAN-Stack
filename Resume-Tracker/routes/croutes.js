var Career = require('../controllers/Career'),
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

//    //Routes for interview CRUD operations
    app.get('/api/career', Career.getCareer); //Read
    app.get('/api/career/:id', Career.getCareer); //Read
    app.post('/api/career', Career.addCareer); //Create
    app.post('/api/career/:id', Career.removeCareer); //Delete
    app.put('/api/career/', Career.updateCareer); //update

}
