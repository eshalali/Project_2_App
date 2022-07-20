// Import dependencies
//////////////////////////////////////
const express = require('express')
const Investment = require('../models/investments')

// create router
//////////////////////////////////////
const router = express.Router()

// NEW route - GET form
// localhost:4000/investments/new
router.get('/new', (req, res) => {
    res.render('investments/new')
})

// CREATE route - POST
router.post('/', (req, res) => {
    // add owner to investment so it shows up on index
    req.body.owner = req.session.userId
    Investment.create(req.body)
        .then(investment => {
            // console.log(investment)
            res.redirect('/investments')
        })
        .catch(err => {
            res.json(err)
        })
})

// SHOW route - GET
// localhost:4000/investments/:id
router.get('/:id', (req, res) => {
    const investmentId = req.params.id
    Investment.findById(investmentId)
        .then(investment => {
            res.render('investments/show', { investment })
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE route - DELETE
router.delete('/:id', (req, res) => {
    const investmentId = req.params.id
    Investment.findByIdAndRemove(investmentId)
        .then(investment => {
            res.redirect('/investments')
        })
        .catch(err => {
            res.json(err)
        })
}) 


// EDIT route - GET form
// localhost:4000/investments/:id/edit
router.get('/:id/edit', (req, res) => {
    const investmentId = req.params.id
    Investment.findById(investmentId)
        .then(investment => {
            res.render('investments/edit', { investment })
        })
        .catch(err => {
            res.json(err)
        })
})

// UPDATE route - PUT
router.put('/:id', (req, res) => {
    const investmentId = req.params.id
    Investment.findByIdAndUpdate(investmentId, req.body, {new: true})
        .then(investment => {
            res.redirect(`/investments/${investment._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})



// INDEX route - GET
// localhost:4000/investments
// only want to ever show the items for logged in user, so find by user ID
router.get('/', (req, res) => {
    Investment.find({ owner: req.session.userId})
        .then(investments => {
            res.render('investments/index', { investments })
        })
        .catch(err => {
            res.json(err)
        })
})



// Export router
//////////////////////////////////////
module.exports = router
