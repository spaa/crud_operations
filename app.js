const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const express = require('express');
const http = require('http');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

const MongoOptions =  {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl : process.env.MONGO_URI,
        mongoOptions : MongoOptions,
        touchAfter : 60*60,
        ttl : 60*60,
        autoRemove : 'native'
    })
}))
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))

const route = require('./routes/apiRoute');
app.use('/' , route);

server.listen(5000 , ()=>{
    console.log("Server started on port 5000");
})