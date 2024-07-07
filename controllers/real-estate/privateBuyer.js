const User = require('../../Models-Users/UserManagement-md')
const UserType = require('../../Models-Users/UserType-md')

module.exports.testBuyer = async(req,res) => {
    return res.status(200).json({
        message:"I am buyer, I am authenticated.",
        error : false
    })
}