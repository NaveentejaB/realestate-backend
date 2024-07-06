const express = require("express");
const router = express.Router();

const {postCountry,getAllCountries,updateCountry,deleteCountry} = require("../Controllers-realEstate/country");
const {postState,getAllStates,updateState,deleteState} = require("../Controllers-realEstate/state");
const {postCity,getAllCities,updateCity,deleteCity} = require("../Controllers-realEstate/city");
const {postImage,getAllImages,updateImage,deleteImage} = require("../Controllers-realEstate/image");
const {postRealEstateProperty,getAllRealEstateProperties,updateRealEstateProperty,deleteRealEstateProperty} = require("../Controllers-realEstate/realEstateProperty");


/* country */
router.get('/getAllCountries',getAllCountries);
router.post('/postCountry',postCountry);
router.put('/updateCountry/:id',updateCountry);
router.delete('/deleteCountry/:id',deleteCountry);

/* state */
router.get('/getAllStates',getAllStates);
router.post('/postState',postState);
router.put('/updateState/:id',updateState);
router.delete('/deleteState/:id',deleteState);

/* city */
router.get('/getAllCities',getAllCities);
router.post('/postCity',postCity);
router.put('/updateCity/:id',updateCity);
router.delete('/deleteCity/:id',deleteCity);

/* image */
router.get('/getAllImages',getAllImages);
router.post('/postImage',postImage);
router.put('/updateImage/:id',updateImage);
router.delete('/deleteImage/:id',deleteImage);

/* realestateproperty */
router.get('/getAllRealEstateProperties',getAllRealEstateProperties);
router.post('/postRealEstateProperty',postRealEstateProperty);
router.put('/updateRealEstateProperty/:id',updateRealEstateProperty);
router.delete('/deleteRealEstateProperty/:id',deleteRealEstateProperty);


/* ----------------------------------------------------------------------------------------------------------- */
/* importing standard fucntions */
const { getAllDocuments,createDocument,updateDocument,deleteDocument }=require("../Controllers-Users/Standard-functions");
//importing models
const country = require("../Models-realEstate/Country");
const state = require ("../Models-realEstate/State.js");
const city = require("../Models-realEstate/City.js");
const image = require("../Models-realEstate/Image.js");
const realestateproperty = require("../Models-realEstate/RealEstateProperty.js");

//methods
router.get('/country/getAllCountries',getAllDocuments(country));

router.get('/state/getAllStates',getAllDocuments(state));

router.get('/city/getAllCities',getAllDocuments(city));

router.get('/image/getAllImages',getAllDocuments(image));

router.get('/realestateproperty/getAllRealEstateProperties',getAllDocuments(realestateproperty));


module.exports = router;