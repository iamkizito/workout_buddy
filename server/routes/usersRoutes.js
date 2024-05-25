const express = require('express');
const {signIn, signUp, getUser} = require('../controllers/usersController.js')

const router = express.Router()

router.get('/', getUser)
router.post('/signin', signIn)
router.post('/signup', signUp)

module.exports = router