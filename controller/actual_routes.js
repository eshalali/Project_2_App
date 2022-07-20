// Import dependencies
//////////////////////////////////////
const express = require('express')
const Actual = require('../models/actual')
const Expected = require('../models/expected')

// create router
//////////////////////////////////////
const router = express.Router()

// NEW route - GET form
// localhost:4000/actual/new
router.get('/new', (req, res) => {
    res.render('actual/new')
})


// CREATE route - POST
router.post('/', (req, res) => {
    // add owner to actual expense so it shows up on index
    req.body.owner = req.session.userId
    Actual.create(req.body)
        .then(actual => {
            // console.log(actual)
            res.redirect('/actual')
        })
        .catch(err => {
            res.json(err)
        })
})

// INDEX route - GET
// localhost:4000/actual/compare
// only want to ever show the items for logged in user, so find by user ID
router.get('/compare', (req, res) => {
    // let expHousing = 0
    // let expUtilities = 0
    // let expInsurance = 0
    // let expFood = 0
    // let expTransport = 0
    // let expMedical = 0
    // let expPersonal = 0
    // let expShopping = 0
    // let expEnter = 0
    // let expDebt = 0
    // let expSavings = 0
    // let expOther = 0
    // Expected.find({ owner: req.session.userId })
    //     .then( expected => {
    //         if (expected[i].category === 'Housing') {
    //             return expHousing+=expected[i].amount
    //         } else if (expected[i].category === 'Utilities'){
    //             return expUtilities+=expected[i].amount
    //         } else if (expected[i].category === 'Insurance'){
    //             return expInsurance+=expected[i].amount
    //         } else if (expected[i].category === 'Food'){
    //             return expFood+=expected[i].amount
    //         } else if (expected[i].category === 'Transportation'){
    //             return expTransport+=expected[i].amount
    //         } else if (expected[i].category === 'Medical'){
    //             return expMedical+=expected[i].amount
    //         } else if (expected[i].category === 'Personal'){
    //             return expPersonal+=expected[i].amount
    //         } else if (expected[i].category === 'Shopping'){
    //             return expShopping+=expected[i].amount
    //         } else if (expected[i].category === 'Entertainment'){
    //             return expEnter+=expected[i].amount
    //         } else if (expected[i].category === 'Debt'){
    //             return expDebt+=expected[i].amount
    //         } else if (expected[i].category === 'Savings'){
    //             return expSavings+=expected[i].amount
    //         } else {
    //             return expOther+=expected[i].amount
    //         }
    //     })
    //     .catch(err => {
    //         res.json(err)
    //     })
    let actHousing = 0
    let actUtilities = 0
    let actInsurance = 0
    let actFood = 0
    let actTransport = 0
    let actMedical = 0
    let actPersonal = 0
    let actShopping = 0
    let actEnter = 0
    let actDebt = 0
    let actSavings = 0
    let actOther = 0
    Actual.find({ owner: req.session.userId })
        .then(actual => {
             res.render('actual/compare')
            })
        .catch(err => {
            res.json(err)
        })
})


// SHOW route - GET
// localhost:4000/actual/:id
router.get('/:id', (req, res) => {
    const actualId = req.params.id
    Actual.findById(actualId)
        .then(item => {
            res.render('actual/show', { item })
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE route - DELETE
router.delete('/:id', (req, res) => {
    const actualId = req.params.id
    Actual.findByIdAndRemove(actualId)
        .then(actual => {
            res.redirect('/actual')
        })
        .catch(err => {
            res.json(err)
        })
}) 


// EDIT route - GET form
// localhost:4000/actual/:id/edit
router.get('/:id/edit', (req, res) => {
    const actualId = req.params.id
    Actual.findById(actualId)
        .then(item => {
            res.render('actual/edit', { item })
        })
        .catch(err => {
            res.json(err)
        })
})

// UPDATE route - PUT
router.put('/:id', (req, res) => {
    const actualId = req.params.id
    Actual.findByIdAndUpdate(actualId, req.body, {new: true})
        .then(actual => {
            res.redirect(`/actual/${actual._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})



// INDEX route - GET
// localhost:4000/actual
// only want to ever show the items for logged in user, so find by user ID
router.get('/', (req, res) => {
    Actual.find({ owner: req.session.userId})
        .then(actual => {
            res.render('actual/index', { actual })
        })
        .catch(err => {
            res.json(err)
        })
})



// Export router
//////////////////////////////////////
module.exports = router
