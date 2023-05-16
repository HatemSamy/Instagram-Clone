import winston from 'winston'
import {MongoDB}  from 'winston-mongodb'
// import path from 'path'
// import { fileURLToPath } from 'url'
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      
      new winston.transports.File({  
        filename: './log',
        level: 'error',
        format:winston.format.combine(winston.format.timestamp(),winston.format.json())
    }),
     new winston.transports.MongoDB({
        
        level: 'error',
        db:"mongodb://localhost:27017/Instagram",
        options: { useUnifiedTopology: true }
    
    }),
      
    ],
  });


  export default logger