const express = require('express');
const router = express.Router();

const SERVICE = require('../services/apiService');
const auth = require('../functions/auth');

router.post('/login' , auth.ensureAuthenticated , async(req,res)=>{
    try{
        const result = await SERVICE.login(req);
        res.status(200).json(result);
    }
    catch(err){
        console.log("Route Catch Block")
        console.log(err);
        let result = {
            "status" : "ERROR",
            "msg" : err.message
        }
        res.status(400).json(result);
    }
});

router.get('/getAllEmpDetails' , auth.forwardAuthentication , auth.verifyToken , async(req,res)=>{
    try{
        const result = await SERVICE.getAllEmpDetails(req);
        res.status(200).json(result);
    }
    catch(err){
        console.log("Route Catch Block")
        console.log(err);
        let result = {
            "status" : "ERROR",
            "msg" : err.message
        }
        res.status(400).json(result);
    }
});

router.post('/updateEmpData' , auth.forwardAuthentication , auth.verifyToken , async(req,res)=>{
    try{
        const result = await SERVICE.updateEmpDetails(req);
        res.status(200).json(result);
    }
    catch(err){
        console.log("Route Catch Block")
        console.log(err);
        let result = {
            "status" : "ERROR",
            "msg" : err.message
        }
        res.status(400).json(result);
    }
});

router.post('/deleteEmpData' , auth.forwardAuthentication , auth.verifyToken , async(req,res)=>{
    try{
        const result = await SERVICE.deleteEmpData(req);
        res.status(200).json(result);
    }
    catch(err){
        console.log("Route Catch Block")
        console.log(err);
        let result = {
            "status" : "ERROR",
            "msg" : err.message
        }
        res.status(400).json(result);
    }
});

router.post('/addEmpData' , auth.forwardAuthentication , auth.verifyToken , async(req,res)=>{
    try{
        const result = await SERVICE.addEmployee(req);
        res.status(200).json(result);
    }
    catch(err){
        console.log("Route Catch Block")
        console.log(err);
        let result = {
            "status" : "ERROR",
            "msg" : err.message
        }
        res.status(400).json(result);
    }
});

router.get('/logout' , auth.forwardAuthentication , async(req,res)=>{
    req.session.destroy();
    let result = {
        "status" : "Successfull",
        "msg" : "Logged Out Successfully"
    }
    res.status(200).json(result);
})

module.exports = router;