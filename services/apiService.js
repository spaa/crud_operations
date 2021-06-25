const DAO = require('../dao/apiDAO');
const auth = require('../functions/auth');

module.exports = {
    login : async(req)=>{
        try{
            const {empName , pass} = req.body;
            const whereClause = {
                empName , 
                pass
            }
            const res = await DAO.getEmployeeDetail(whereClause);
            if(!res) throw new Error('UserName / Password Incorrect');
            const authObj = {
                "empName" : res.empName,
                "role" : res.role
            };
            const token = auth.generateToken(authObj , '1h');
            req.session.user = {
                "name" : empName,
                "role" : res.role
            };
            return {
                "status" : "Successfull",
                "msg" : "Employee Logged in successfully",
                "token" : token
            }            
        }
        catch(err){
            console.log("Service Catch Block")
            console.log(err);
            throw err;
        }
    },

    getAllEmpDetails : async(req)=>{
        try{
            const result = await DAO.getAllEmployeeDetails();
            if(!result) throw new Error("Not able to fetch employee details...Please try again");
            return {
                "status" : "Successfull",
                "msg" : "All Employee details fetched successfully",
                "apiData" : result
            }
        }
        catch(err){
            console.log("Service Catch Block")
            console.log(err);
            throw err;
        }
    },
    
    updateEmpDetails : async(req)=>{
        try{
            if(req.session.user.name != req.payload.empName || req.session.user.role != req.payload.role) 
                throw new Error("Token and Session data does not match");
            if(req.session.user.role != "Admin") throw new Error("Does not have admin rights to update data");
            const whereClause = {
                "empName" : req.body.empName
            };
            const updateData = {
                "location" : req.body.location
            };
            const result = await DAO.updateEmployee(whereClause , updateData);
            if(!result) throw new Error('Not able to update emp details at this moment');
            return {
                "status" : "Successfull",
                "msg" : "Employee details updated successfully",
                "apiData" : result
            }
        }
        catch(err){
            console.log("Service Catch Block")
            console.log(err);
            throw err;
        }
    },

    deleteEmpData : async(req)=>{
        try{
            if(req.session.user.name != req.payload.empName || req.session.user.role != req.payload.role) 
                throw new Error("Token and Session data does not match");
            if(req.session.user.role != "Admin") throw new Error("Does not have admin rights to update data");
            const whereClause = {
                "empName" : req.body.empName
            };
            const result = await DAO.deleteEmployee(whereClause);
            if(!result) throw new Error('not able to delete emp at this moment');
            return {
                "status" : "Successfull",
                "msg" : "Employee data deleted successfully"
            }
        }
        catch(err){
            console.log("Service Catch Block")
            console.log(err);
            throw err;
        }
    },

    addEmployee : async(req)=>{
        try{
            if(req.session.user.name != req.payload.empName || req.session.user.role != req.payload.role) 
                throw new Error("Token and Session data does not match");
            if(req.session.user.role != "Admin") throw new Error("Does not have admin rights to update data");
            const {empName , role , pass, location} = req.body;
            const obj = {empName , role , pass , location};
            const result = await DAO.addEmployee(obj);
            if(!result) throw new Error('not able to add emp at this moment');
            return {
                "status" : "Successfull",
                "msg" : "Employee data added successfully"
            }
        }
        catch(err){
            console.log("Service Catch Block")
            console.log(err);
            throw err;
        }
    }
}