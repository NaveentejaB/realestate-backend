require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ConnectDB = require("./Database/connectdb");

const app = express();
app.use(bodyParser.json());
ConnectDB();
const PORT = 2000;



//importing the routes
const userManagementRoutes = require('./Views/UserMngmtroute');
const realEstatePropertyRoutes = require('./Views/realEstateRoute');
// Use routes
app.use('/api/usermanagement', userManagementRoutes);
app.use('/api/realestateproperty', realEstatePropertyRoutes);


// teja - using for handling async error in one place
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({
      message : `Internal server error!`,
      error : true
  })
})

// Default route
app.get("/api", (req, res) => {
    res.send("Welcome to real.estate application....");
  });
  
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  