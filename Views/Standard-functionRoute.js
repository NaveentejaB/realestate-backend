// routes/countryRoutes.js

const express = require('express');
const router = express.Router();
const { getAllDocuments } = require('../Controllers-Users/Standard-functions');
const Country = require('../Models-realEstate/Country'); // Import your Mongoose schema/model
const banner = require("../Models-Users/Banner");
const UserManagement = require("../Models-Users/UserManagement-md");
const Usertype = require("../Models-Users/UserType-md");

// Define your route handlers
router.get('/countries', getAllDocuments(Country));
router.get('/banners',getAllDocuments(banner));
router.get('/UserManagement',getAllDocuments(UserManagement));


module.exports = router;
