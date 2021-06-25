const db = require('../dao/connectDB');
const mongoose = require('mongoose');
const EmployeeModel = require('../models/employee');

try{
module.exports = {
    getAllEmployeeDetails : async()=>{
        const res = await EmployeeModel.find({}).select().lean();
        if(res.length==0) return false;
        return res;
    },

    getEmployeeDetail : async(whereClause)=>{
        const res = await EmployeeModel.findOne(whereClause).lean();
        if(!res) return false;
        return res;
    },

    addEmployee : async(data)=>{
        const newDoc = new EmployeeModel(data);
        const res = await newDoc.save();
        if(!res) return false;
        return true;
    },

    deleteEmployee : async(whereCLause)=>{
        const res = await EmployeeModel.findOneAndDelete(whereCLause).lean();
        if(!res) return false;
        return res;
    },

    updateEmployee : async(whereClause , updateQuery)=>{
        const res = await EmployeeModel.findOneAndUpdate(whereClause , updateQuery , {new : true}).lean();
        if(!res) return false;
        return res;
    }
}
}
catch(err){
    console.log("DAO Catch Block")
    console.log(err);
    throw err;
}