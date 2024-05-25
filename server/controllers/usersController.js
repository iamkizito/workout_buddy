const User = require("../models/usersModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator")

const signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email:email})
        if (!user) {
            console.log("email incorrect")
            return res.status(404).json({error: "user not found, email or password incorrect"})
        }

        const hashedPassword = await bcrypt.hash(password, user.salt)
        if (user.password !== hashedPassword) {
            console.log("password incorrect")
            return res.status(404).json({error: "user not found, email or password incorrect"})
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '10m' })
        res.status(200).json({mssg: "ok", token, user:{...JSON.parse(JSON.stringify(user)), password:null}})
    }catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const signUp = async (req, res) => {
    const {email, password} = req.body

    if (!validator.isEmail(email)) {
        return res.status(400).json({error: "invalid email address"})
    }

    // if (!validator.isStrongPassword(password)) {
    //     return res.status(400).json({error: "passworrd is not strong enough"})
    // }

    try {
        const userFound = await User.findOne({email:email})
        if (userFound) {
            return res.status(400).json({error: "email already exists"})
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({email, password:hashedPassword, salt})
        const token = jwt.sign({id:user._id}, process.env.SECRET, {expiresIn: '10m'})
        res.status(200).json({mssg: "ok", token})
    }catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

const getUser = (req, res) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({error: "unauthenticated request"})
    }

    res.status(200).json({mssg: "ok", user:{...req.user, password:null}})
}



module.exports = {
    signIn,
    signUp,
    getUser
}

