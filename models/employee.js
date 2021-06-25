const mongoose = require('mongoose');

const EmployeeSchema =new mongoose.Schema(
    {
        "empName" : String,
        "empID" : Number,
        "role" : String,
        "pass" : String,
        "location" : String
    },{collection : "employees"}
);

module.exports = mongoose.model("employees", EmployeeSchema);