import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlconfig'
import { LoginEmployee } from '../interfaces/employees'
import  jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ExtendedEmployee } from '../middleware/verifytoken'

export const registerEmployee=async(req:Request, res: Response)=>{
    try{
        let{name, email, phone_no, id_no, KRA_PIN, NHIF_NO, NSSF_NO, password}=req.body

       let  employee_id= v4()
       const hashedPwd = await bcrypt.hash(password,5)

        const pool=await mssql.connect(sqlConfig)

        let result= await pool.request()
          .input("employee_id", mssql.VarChar, employee_id)
          .input("name", mssql.VarChar, name)
          .input("email", mssql.VarChar, email)
          .input("phone_no", mssql.VarChar, phone_no)
          .input("id_no", mssql.Int, id_no)
          .input("KRA_PIN", mssql.VarChar, KRA_PIN)
          .input("NHIF_NO", mssql.VarChar, NHIF_NO)
          .input("NSSF_NO", mssql.VarChar, NSSF_NO)
          .input("password", mssql.VarChar, hashedPwd)
          .execute('registerEmployee')

          console.log(result);
          



          return res.status(200).json({
            message: 'Employee registered successfully'
          })
        




    }catch (error){
        return res.json({
            error:error
        })
    }

}

export const loginEmployee= async(req:Request, res:Response)=>{

    try{

        const {email, password}=req.body

        const pool= await mssql.connect(sqlConfig)


        let user =await (await pool.request().input ("email",mssql.VarChar, email) .input("password", mssql.VarChar, password).execute('loginEmployee')).recordset

        console.log(user);

        if(user[0]?.email==email){
             const CorrectPwd=await bcrypt.compare(password, user[0]?.password)

             if(!CorrectPwd){
                return res.status(401).json({
                    message: 'incorrect password'
                })
             }

             const LoginCredentials = user.map(records=>{
                const {phone_no, id_no,KRA_PIN,password,NSSF_NO,NHIF_NO,welcomed, ...rest}=records
                
                return rest
             })

             console.log(LoginCredentials);

             dotenv.config()

             const token =jwt.sign(LoginCredentials[0],process.env.SECRET as string, {
                expiresIn: '3600s'
             })

             return res.status(200).json({
                message: 'Login successful', token
             })
             
        }else {
            return res.json({
                message: 'Email not found'
            })
        }

       

        

    }catch(error){
        return res.json({
            error:error
        })
    }

}

export const getAllEmployees= async(req:Request, res:Response)=>{
    try{
        const pool= await mssql.connect(sqlConfig)

        let employees= (await pool.request().execute('fetchAllEmployees')).recordset

        return res.status(200).json({
            employees: employees
        })


    }catch(error){
        return res.json({
            error:error
        })
    }
}

export const checkUserDetails= async (req:ExtendedEmployee, res:Response)=>{

    if(req.info){
      return res.json({
            info:req.info
        })
    }

}
