// Import dependencies
//////////////////////////////////////
const express = require('express')
const Actual = require('../models/actual')
const fetch = require('node-fetch')

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
    Actual.find({ owner: req.session.userId })
        .then(actual => {
            let incomeAmount = 10
            let expenseAmount = 20
            for (item in actual) {
                if (item.type === 'Income') {
                    incomeAmount+=item.amount
                } else {
                    expenseAmount+=item.amount
                }
            }
            fetch(`https://quickchart.io/chart?c={type:'bar',data:{labels:[Income,Expected],datasets:[{label:'Amount in $',data:[${incomeAmount}, ${expenseAmount}]}]}}`)
            .then((apiRes) => {
                return apiRes.json()
            })
                .then((jsonData) => {
                    res.render('actual/compare', { incomeAmount:incomeAmount, expenseAmount:expenseAmount })
                })
                .catch(err => {
                    console.log(err)
                })
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
