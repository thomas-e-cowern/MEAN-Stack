var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    URoutes = require('./routes/uroutes'),
    RRoutes = require('./routes/rroutes'),
    IRoutes = require('./routes/iroutes'),
    CRoutes = require('./routes/croutes'),
    moment = require('moment'),
    path = require('path'),
    sessions = require('client-sessions')({
        cookieName: "resume-session",  // front-end cookie name, currently pulled from package.json
        secret: 'DR@G0N$',        // the encryption password : keep this safe
        requestKey: 'session',    // req.session,
        duration: (86400 * 1000) * 7, // one week in milliseconds
        cookie: {
            ephemeral: true,     // when true, cookie expires when browser is closed
            httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
            secure: false         // when true, cookie will only be read when sent over HTTPS
        }
    }); // encrypted cookies!

mongoose.connect('mongodb://localhost/resume-tracker');

var PORT = process.env.PORT || 3000

var app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}), bodyParser.json());
app.use(sessions);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
URoutes(app);
CRoutes(app);
RRoutes(app);
IRoutes(app);

app.listen(3000, ()=>{
    console.log('Resume Tracker server is running on: ', PORT);
});