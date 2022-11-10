const express=require('express');
app=express();

app.use(express.json());//get body data
require('dotenv').config();//to use env file
mongoose=require('mongoose');//connect with database 
mongoose.connect(`mongodb://localhost:27017/${process.env.DbName}`);//connect with database

const permitRouter=require('./route/permitRoute');
app.use('/permit',permitRouter);

const roleRouter=require('./route/RoleRoute');
app.use('/role',roleRouter);


//error handling
app.use((err, req, res, next) => {
   err.status=err.status||500;
   res.status(err.status).json({con:false,msg:err.message});
  })

// to implement migration 
  const defaultData = async() =>{
   let migrator= require('./migrations/migrator');
   migrator.migrate();
}

defaultData();


  app.listen(process.env.PORT,console.log(`sever is running at port ${process.env.PORT}`));