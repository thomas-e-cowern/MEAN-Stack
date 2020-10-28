var Career = require('../controllers/career'),
    Auth = require('../controllers/auth'),
    express = require('express');


module.exports = (app) => {


//    //Routes for interview CRUD operations
    app.get('/api/career', Career.getCareer); //Read
    app.get('/api/career/:id', Career.getCareer); //Read
    app.post('/api/career', Career.addCareer); //Create
    app.post('/api/career/:id', Career.removeCareer); //Delete
    app.put('/api/career/', Career.updateCareer); //update

}
