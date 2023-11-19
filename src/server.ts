import express, { NextFunction, Request, Response, json } from 'express'
import employee_router from './routes/employeeroutes'

const app= express()

app.use(json())

app.use((error:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message: error.message
    })

})

app.use('/employee', employee_router)

app.listen(4400, ()=>{
    console.log("server running on port 4400")
})