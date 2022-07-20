// Import dependencies
//////////////////////////////////////
const express = require('express')
const Expected = require('../models/expected')

// create router
//////////////////////////////////////
const router = express.Router()

// NEW route - GET form
// localhost:4000/expected/new
router.get('/new', (req, res) => {
    res.render('expected/new')
})

// CREATE route - POST
router.post('/', (req, res) => {
    // add owner to expected expense so it shows up on index
    req.body.owner = req.session.userId
    Expected.create(req.body)
        .then(expected => {
            // console.log(expected)
            res.redirect('/expected')
        })
        .catch(err => {
            res.json(err)
        })
})

// SHOW route - GET
// localhost:4000/expected/:id
router.get('/:id', (req, res) => {
    const expectedId = req.params.id
    Expected.findById(expectedId)
        .then(item => {
            res.render('expected/show', { item })
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE route - DELETE
router.delete('/:id', (req, res) => {
    const expectedId = req.params.id
    Expected.findByIdAndRemove(expectedId)
        .then(expected => {
            res.redirect('/expected')
        })
        .catch(err => {
            res.json(err)
        })
}) 


// EDIT route - GET form
// localhost:4000/expected/:id/edit
router.get('/:id/edit', (req, res) => {
    const expectedId = req.params.id
    Expected.findById(expectedId)
        .then(item => {
            res.render('expected/edit', { item })
        })
        .catch(err => {
            res.json(err)
        })
})

// UPDATE route - PUT
router.put('/:id', (req, res) => {
    const expectedId = req.params.id
    Expected.findByIdAndUpdate(expectedId, req.body, {new: true})
        .then(expected => {
            res.redirect(`/expected/${expected._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})



// INDEX route - GET
// localhost:4000/expected
// only want to ever show the items for logged in user, so find by user ID
router.get('/', (req, res) => {
    Expected.find({ owner: req.session.userId})
        .then(expected => {
            res.render('expected/index', { expected })
        })
        .catch(err => {
            res.json(err)
        })
})



// Export router
//////////////////////////////////////
module.exports = router
