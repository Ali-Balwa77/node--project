const jwt = require('jsonwebtoken');
const empModel = require('../models/registers')

const auth = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt
        const userverify = jwt.verify(token, process.env.SECRET_KEY)
        console.log(userverify)
        const user = await empModel.findOne({_id: userverify._id})
        console.log(user)

        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;