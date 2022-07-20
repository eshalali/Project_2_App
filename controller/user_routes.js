// Import dependencies
//////////////////////////////////////
const express = require('express')
const User = require('../models/user')
// bcrypt is used to hash(encrypt) passwords
const bcrypt = require('bcryptjs')

// create router
//////////////////////////////////////
const router = express.Router()

// show homepage
router.get('/homepage', (req, res) => {
    res.render('users/homepage')
})


// sign up routes
// GET route to show form
router.get('/signup', async (req, res) =>  {
    res.render('users/signup')
})
// POST route to add to db
router.post('/signup', async (req, res) => {
    // console.log('this is our initial request body', req.body)
    //  encrypt password with bcrypt.hash
    req.body.password = await bcrypt.hash(
        req.body.password,
        // encrypt the password 10 times before choosing one
        await bcrypt.genSalt(10)
    )
    // create user with hashed password
    // console.log('this is req.body after hashing', req.body)
    User.create(req.body)
        //  upon successful creation, redirect to login
        .then(user => {
            res.redirect('/users/login')
        })
        //  if unsuccessful creation, send error
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// log in routes
// GET route to show form
router.get('/login', (req, res) => {
    res.render('users/login')
})
// POST route to login, create session
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    // console.log('this is session', req.session)
    User.findOne({ username })
        // check if user exists
        .then(async (user) => {
            if (user) {
                // user exists, check if password matches
                const result = await bcrypt.compare(password, user.password)
                // if password right, start session
                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user._id
                // redirect to user account, main
                res.redirect('/users/homepage')
                // if password wrong, send error
                } else {
                    res.json({ error: 'password incorrect'})
                }
            // if user does not exist, send error
            } else {
                res.json({ error: 'user does not exist'})
            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
}) 

// logout route
// GET to destroy session
router.get('/logout', (req, res) => {
    req.session.destroy(ret => {
        console.log('this is returned from destroy session', ret)
        console.log('session destroyed')
        res.redirect('/users/login')
    })
})

// Export router
//////////////////////////////////////
module.exports = router