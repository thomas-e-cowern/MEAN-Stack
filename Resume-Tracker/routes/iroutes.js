var Interview = require('../controllers/interview'),
    Auth = require('../controllers/auth'),
    express = require('express');


module.exports = (app) => {


//    //Routes for Interview CRUD operations
    app.get('/api/interview', Interview.getInterview); //Read
    app.get('/api/interview/:id', Interview.getInterview); //Read
    app.post('/api/interview', Interview.addInterview); //Create
    app.post('/api/interview/:id', Interview.removeInterview); //Delete
    app.put('/api/interview/', Interview.updateInterview); //update


}
