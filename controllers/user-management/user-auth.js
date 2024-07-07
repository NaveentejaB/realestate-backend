const jwt = require('jsonwebtoken')
const User = require('../../Models-Users/UserManagement-md')
const UserType = require('../../Models-Users/UserType-md')

module.exports.register = async(req,res) => {
    
    // here userType will be buyer, seller etc.. (string) 
    const {FirstName,LastName,Email,Password,PhoneNumber,Address,Pincode,userType} = req.body;
    
    const checkUser = await User.findOne({$or : [{ Email:Email },{ PhoneNumber:PhoneNumber }]});

    // if the checkUser is true, that means the there exist a user in database with either email or phone number
    // so we should not store them
    if(checkUser){
        return res.status(400).json({
            message : 'user already exists with the given email or mobile number.',
            error : true
        })
    }

    // creating user type and storing the newly created data in userTypeData
    const userTypeData = await new UserType({
        UserTypeName : userType,
        Description : ""
    }).save()
    console.log(userTypeData);

    // creating user with given data and and storing the newly created data in userData
    const userData = await new User({
        FirstName,LastName,Email,Password,PhoneNumber,Address,Pincode, UserType : userTypeData._id
    }).save()
    console.log(userData);

    // storing userId ( _id ), email and userType in the access token
    const payload = { id:userData._id ,email:userData.user_email ,role : userType}

    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "45m" }
    )

    return res.status(200).json({
        message : 'user registration successfull',
        accessToken : accessToken,
        error : false
    })
}
