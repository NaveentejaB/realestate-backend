const express = require("express");
const router = express.Router();
//const { verifyToken, authorizeUser } = require("../Middleware/authentication");
const {verifyToken} = require("../Middleware/Auth");
const userAuth = require("../controllers/user-management/user-auth")
const {signupuser,loginuser,postuser,getallusers,updateuser,deleteuser} = require("../Controllers-Users/usermanagement") //userManagement
const {postuserType,getalluserstypes,updateUserTypeById,deleteUserTypeById} = require("../Controllers-Users/userType-con"); //userType
const {postUserCategoryXref,updateUserCategoryXref,getAllUserCategoryXrefs,deleteUserCategoryXref} = require("../Controllers-Users/UserCategoryXref")
const { postcategory, getAllCategories, updateCategory, getCategoryByName, deleteCategory } = require("../Controllers-Users/category");
const {postBanner,getAllBanners,updateBanner,deleteBanner} = require("../Controllers-Users/banner");
const {postCategoryBannerXref,getAllCategoryBannerXrefs,updateCategoryBannerXref,deleteCategoryBannerXref}=require("../Controllers-Users/categoryBannerXref");

/* userType */
//post usertype
router.post("/postUserType",  postuserType);
//getall method
router.get("/getAllUsersTypes",  getalluserstypes);
//update usertype
router.put('/updateUserType/:id',updateUserTypeById);
//delete usertype
router.delete('/deleteUserType/:id',deleteUserTypeById);


/* userManagement */
// Register user route 
router.post("/register", userAuth.register);
// Login user route  
router.post("/login",  loginuser);
/* --------------------------------------------------------- */
//post user
router.post("/postUser",postuser);
//getall users
router.get('/getAllUsers',getallusers);
//update user
router.put('/updateUser/:id',updateuser);
//Delete user
router.delete('/deleteUser/:id',deleteuser);


/* UserCategoryXref */
router.post('/userCategoryXref',postUserCategoryXref);
router.get('/getUsersCategoryXref',getAllUserCategoryXrefs);

/* category */
router.post('/postcategory',postcategory);
router.get('/getAllCategories',getAllCategories);
router.put('/updateCategory/:id',updateCategory);
router.delete('/deleteCategory/:id',deleteCategory);
router.get('/getCategoryByName/:categoryName',getCategoryByName);

/* Banner*/
router.post('/postBanner',postBanner);
router.get('/getAllBanners',getAllBanners);
router.put('/updateBanner/:id',updateBanner);
router.delete('/deleteBanner/:id',deleteBanner);

/* CategoryBannerXref */
router.post('/postCategoryBannerXref',postCategoryBannerXref);
router.get('/getAllCategoryBannerXrefs',getAllCategoryBannerXrefs);
router.put('/updateCategoryBannerXref/:id',updateCategoryBannerXref);
router.delete('/deleteCategoryBannerXref/:id',deleteCategoryBannerXref);

module.exports = router;
