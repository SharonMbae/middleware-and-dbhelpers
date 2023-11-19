import { Router } from "express";
import { checkUserDetails, getAllEmployees, loginEmployee, registerEmployee } from "../controller/employeescontroller";
import { verifytoken } from "../middleware/verifytoken";

const employee_router=Router()

employee_router.post('/register', registerEmployee)
employee_router.post('/login', loginEmployee)
employee_router.get('/', verifytoken, getAllEmployees)
employee_router.get('/check_user_details',verifytoken, checkUserDetails)

export default employee_router