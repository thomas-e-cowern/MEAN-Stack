var Resume = require('../controllers/resume'),
    Users = require('../controllers/users'),
    Auth = require('../controllers/auth'),
    express = require('express');


module.exports = (app) => {


    //Routes for Resume CRUD operations
    app.get('/api/resume', Resume.getResume); //Read
    app.get('/api/resume/:id', Resume.getResume); //Read
    app.post('/api/resume', Resume.addResume); //Create
    app.post('/api/resume/:id', Resume.removeResume); //Delete
    app.put('/api/resume/', Resume.updateResume); //update
}
