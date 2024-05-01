const express = require('express');
require('dotenv').config();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRouter')
const fileRouter = require('./routes/fileRouter')
const userRouter = require('./routes/userRouter')
<<<<<<< HEAD
const questionsRouter = require('./routes/questionsRouter')
=======
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
const errorMiddleware = require('./middleware/errorMiddleware');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 8000

const app = express();
app.use(fileUpload({}))
app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: process.env.CLIENT_URL
}));
app.use("/api/file", fileRouter);
<<<<<<< HEAD
app.use('/api/questions',questionsRouter)
=======
>>>>>>> cf350cb7890880d44dfb82159485905f5080dc4c
app.use("/api", authRouter);
app.use("/api", userRouter)
app.use(errorMiddleware);


const start = async () =>{
    try{
        app.listen(PORT, ()=> console.log(`server started on ${PORT} port`))
    }
    catch(e){
        console.log(e)
    }
}
start();