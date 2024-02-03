const express = require('express')
const {
    getServices,
    getService,
    createService,
    deleteService,
    updateService
} = require('../controllers/serviceController')

const router = express.Router()


// GET all services
router.get('/', getServices)

// GET a single service
router.get('/:id',getService)

// POST a new service
router.post('/', createService)

// DELETE a service
router.delete('/:id', deleteService)

// UPDATE a service
router.patch('/:id', updateService)

module.exports = router