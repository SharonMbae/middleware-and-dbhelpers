import dotenv from 'dotenv'
dotenv.config()
import { NextFunction, Request, Response } from 'express'
import jwt  from 'jsonwebtoken'
import { Employee } from '../interfaces/employees'

export interface ExtendedEmployee extends Request{
    info?:Employee
}

export const verifytoken= (req:ExtendedEmployee, res:Response, next:NextFunction)=>{
    try{
        const token=req.headers['token']as string
        if (!token){
            return res.status(404).json({
                message: 'permission set denies you access'
            })
        }

        const data = jwt.verify(token, process.env.SECRET as string) as Employee

      req.info= data
        
    }catch(error){
      return res.json({
            message:error

        })
    }

    next();
}