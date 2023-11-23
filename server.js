import express from 'express'; 
import bodyParser from 'body-parser';
import { Mongoose } from './config/db.js';
import { configDotenv } from 'dotenv';
import cors from 'cors'; 
import { googleStrategy } from './middlewares/googleOauth.js';

const port = 2000; 

const app = express(); 


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors()); 



//invoke cors 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    next(); 
}) 

//import routes 
import { userRoute } from './routes/index.js';

//routes 
app.use('/user', userRoute); 

app.get('/', (req, res) =>{
    res.send('Welcome to Pharmacy App!!!')
}) 

//use errorhandler here 



app.listen(process.env.PORT || port, () =>{
    console.log(`Pharmacy App Server listening at http://localhost:${port}`)
})