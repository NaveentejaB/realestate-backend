const User = require('../../Models-Users/UserManagement-md')
const UserType = require('../../Models-Users/UserType-md')

module.exports.testSeller = async(req,res) => {
    return res.status(200).json({
        message:"I am Seller, I am authenticated.",
        error : false
    })
}