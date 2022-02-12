const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");
const cloudinary = require("cloudinary")


// Handle the uncought exceptions       => this code should be on the top
process.on("uncaughtException", err =>{
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to Uncought Exceptions");
    process.exit(1);
})



// setting up config file
if(process.env.NODE_ENV !== 'PRODUCTION'){

    require("dotenv").config({path: "config/config.env"});
    
}

// Connecting to database
connectDatabase();


// setting up cloudinary configuration
cloudinary.config({
    cloud_name: "ddpcteo9m",
    api_key: "195249268324576",
    api_secret: "eEGlAnI8NGkrGJAlcBltlC3WLUg"
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled Promised rejections
process.on("unhandledRejection", err =>{
    console.log(`ERROR: ${err.stack}`);
    console.log("Shutting down the server due to unhandled Promise rejection");
    server.close(()=>{
        process.exit(1)
    }) 
})


