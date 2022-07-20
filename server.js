/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const userRoutes = require('./controller/user_routes')
const expectedRoutes = require('./controller/expected_routes')
const actualRoutes = require('./controller/actual_routes')
const goalRoutes = require('./controller/goal_routes')
const investmentRoutes = require('./controller/investment_routes')

// create app
const app = require('liquid-express-views')(express())

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: false })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically
// bring in our session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo')

// here's the middleware that sets up our sessions
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URI
		}),
		saveUninitialized: true,
		resave: false
	})
)

// Routes
////////////////////////////////////////////
app.use('/users', userRoutes)
app.use('/expected', expectedRoutes)
app.use('/actual', actualRoutes)
app.use('/goals', goalRoutes)
app.use('/investments', investmentRoutes)
app.get('/', (req, res) => {
    // res.send('your server is running')
    res.redirect('/users/login')
})
    
////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})
