const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database");





//Handling uncaught Exception (Error handling)
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    server.close(()=>{//close the server
        process.exit(1);//exit from this process
    });;
})



//config
dotenv.config({path:'backend/config/config.env'});

//connecting to database
connectDatabase();



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started at http://localhost:${process.env.PORT}`);
});


//Unhandled Promise Rejection (Error handling)
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise Rejection`);

    server.close(()=>{//close the server
        process.exit(1);//exit from this process
    });;
});