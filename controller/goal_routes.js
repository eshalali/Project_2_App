// Import dependencies
//////////////////////////////////////
const express = require('express')
const Goal = require('../models/goals')

// create router
//////////////////////////////////////
const router = express.Router()

// DELETE route - DELETE
router.delete('/:id', (req, res) => {
    const goalId = req.params.id
    Goal.findByIdAndRemove(goalId)
        .then(goal => {
            res.redirect('/goals')
        })
        .catch(err => {
            res.json(err)
        })
}) 


// EDIT route - GET form
// localhost:4000/goals/:id/edit
router.get('/:id/edit', (req, res) => {
    const goalId = req.params.id
    Goal.findById(goalId)
        .then(goal => {
            res.render('goals/edit', { goal })
        })
        .catch(err => {
            res.json(err)
        })
})

// UPDATE route - PUT
router.put('/:id', (req, res) => {
    const goalId = req.params.id
    Goal.findByIdAndUpdate(goalId, req.body, {new: true})
        .then(goal => {
            res.redirect(`/goals/${goal._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})


// NEW route - GET form
// localhost:4000/goals/new
router.get('/new', (req, res) => {
    res.render('goals/new')
})

// CREATE route - POST
router.post('/', (req, res) => {
    // add owner to goal so it shows up on index
    req.body.owner = req.session.userId
    Goal.create(req.body)
        .then(goal => {
            // console.log(goal)
            res.redirect('/goals')
        })
        .catch(err => {
            res.json(err)
        })
})

// SHOW route - GET
// localhost:4000/goals/:id
router.get('/:id', (req, res) => {
    const goalId = req.params.id
    Goal.findById(goalId)
        .then(goal => {
            res.render('goals/show', { goal })
        })
        .catch(err => {
            res.json(err)
        })
})



// INDEX route - GET
// localhost:4000/goals
// only want to ever show the goals for logged in user, so find by user ID
router.get('/', (req, res) => {
    Goal.find({ owner: req.session.userId})
        .then(goals => {
            res.render('goals/index', { goals })
        })
        .catch(err => {
            res.json(err)
        })
})



// Export router
//////////////////////////////////////
module.exports = router
