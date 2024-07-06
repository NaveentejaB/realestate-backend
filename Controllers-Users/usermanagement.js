const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Models
const UserModel = require('../Models-Users/UserManagement-md');
const UserTypeModel = require('../Models-Users/UserType-md');

// JWT Secret Key
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjAxODQwNTEsImV4cCI6MTcyMDE4NzY1MX0.V6tJ-T1hxd4yv2zQyK_EtB7lVTlqENDGbnzBAltkql0';

// Routes
const signupuser = async (req, res) => {
    try {
      const {UserId,FirstName,LastName,Email,Password,PhoneNumber,Address,Pincode,UserType,} = req.body;
  
      // Check if user already exists
      let existingUser = await UserModel.findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Create new user
      const newUser = new UserModel({UserId,FirstName,LastName,Email,Password,PhoneNumber,Address,Pincode,UserType,});
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const loginuser = async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      // Check if user exists
      const user = await UserModel.findOne({ Email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Validate password
      // Compare passwords 
      if (user.Password !== Password) {
        return res.status(400).json({ message: "Invalid credentials" });
      };
  
      // Create JWT token
      const token = jwt.sign({ userId: user.UserId }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({message:"User login successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

/////////////////////////////////////////////////////////////////////////////////////////////
  //post user details
//routes /postuser
const postuser = async (req, res) => {
  const { UserId, FirstName, LastName, Email, Password, PhoneNumber, Address, Pincode, UserType } = req.body;
  try {
      // Create a new entry of userManagementSchema with request body
      const newuser = new userManagementSchema({
          UserId, FirstName, LastName, Email, Password, PhoneNumber, Address, Pincode, UserType
      });
      
      // Save the new user to the database
      await newuser.save();
      
      // Retrieve all users from the database after saving
      const oData = await UserModel.find();
      
      // Response with success message and updated data

     // return res.json({ message: "New user saved successfully...", data }); 
      return res.status(200).json({ message: "New user saved successfully...", oData }) ;
  } catch (error) {
      console.error("Error saving user", error.message);
      
      // Return server error if save operation fails
      return res.status(500).json({ error: "Failed to save user" });
  }
};

// get all users
//routes /getallusers
const getallusers = async (req, res) => {
  try {
      // Retrieve all users from the database
      const alldata = await UserModel.find();
      
      // Response with all user data
      //return res.json(alldata);
      return res.status(200).json({message: "get all user details sucessfully", alldata});
  } catch (error) {
      console.error("Error fetching users", error.message);
      
      // return server error
      return res.status(500).json({ error: "Server error" });
  }
};

// update user by id
// routes /updateuser/:id
const updateuser = async (req, res) => {
  const { UserId, FirstName, LastName, Email, Password, PhoneNumber, Address, Pincode, UserType } = req.body;
  const id = req.params.id;
  try {
      // Define update object with new user details
      const update = { UserId, FirstName, LastName, Email, Password, PhoneNumber, Address, Pincode, UserType };
      
      // Find user by ID and update with new details
      const updateuser = await UserModel.findByIdAndUpdate(id, update, { new: true });
      
      // Check if user exists
      if (!updateuser) {
          return res.status(404).json({ error: "User not found" });
      }
      
      // Response with updated user details
      //return res.json(updateuser);
      return res.status(200).json({message: "user details updated successfully", updateuser});
  } catch (error) {
      console.error("Error updating user", error.message);
      
      // message and return server error
      return res.status(500).json({ error: "Server error" });
  }
};

// delete by id
//routes /deleteuser/:id
const deleteuser = async (req, res) => {
  try {
      // Find user by ID and delete
      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      
      // Check if user exists
      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      // Respond with success message
      // res.json({ message: 'User deleted successfully' });
       return res.status(200).json({message:"User deleted successfully"})
  } catch (error) {
      console.error("Error deleting user", error.message);
      
      //message and return server error
      return res.status(500).json({ error: "Server error" });
  }
};

//module.exports = {postuser,getallusers,updateuser,deleteuser};

module.exports ={signupuser,loginuser,postuser,getallusers,updateuser,deleteuser};