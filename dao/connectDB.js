const mongoose = require('mongoose');
require('dotenv').config();

const MongoOptions =  {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
try{
    var db = mongoose.connect(process.env.MONGO_URI, MongoOptions).then(conn => {
        console.log("Connectd to DB");
        return conn;
    }).catch(err=>{
        console.log(err);
        throw err;
    })
}
catch(err){
    console.log(err);
}

module.exports = db;