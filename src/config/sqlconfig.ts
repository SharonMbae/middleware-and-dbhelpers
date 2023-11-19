
import dotenv from 'dotenv'



dotenv.config({path:'src/.env'});

export const sqlConfig = {
  user: 'sa',
  password: '1234',
  database: 'Employee_management',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

