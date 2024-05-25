const User = require("../models/usersModel.js")
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    req.user = null
    req.isAuthenticated = false

    if (req.headers.authorization) {
        try {
            const tokenData = jwt.verify(req.headers.authorization.split(" ")[1], process.env.SECRET)
            const user = await User.findById(tokenData.id)

            if (user) {
                req.user = JSON.parse(JSON.stringify(user))
                req.isAuthenticated = true
            }

        }catch (error) {
            console.log(error)
        }
    }
    next()       
}

module.exports = requireAuth