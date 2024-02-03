const Service = require('../models/serviceModel')
const  mongoose = require('mongoose')

// get all services
const getServices = async (req, res) => {
    try{
        const services = await Service.find({}).sort({createdAt: -1})
        res.status(200).json(services)
    }catch( error ){
        console.error('Error getting all services', error);
        res.status(500).send('Internal Server Error');
    }
}

// get a single service
const getService = async (req, res) => {
    try{
        const { id } = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Invalid id'})
        }

        const service = await Service.findById(id)

        if(!service){
            return res.status(404).json({error: 'Service not Found'})
        }
        res.status(200).json(service)
    }catch( error ){
        console.error('Error getting a service', error);
        res.status(500).send('Internal Server Error');
    }
}

// create a new service
const createService = async (req, res) => {
    const {name, duration, organization_name} = req.body

    let emptyFields = []

    if(!name){
        emptyFields.push('name')
    }
    if(!duration){
        emptyFields.push('duration')
    }
    if(!organization_name){
        emptyFields.push('organization_name')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try{
        const organization_id = await Organization.findOne({name: organization_name})._id
        const service = await Service.create({name, duration, organization_id})
        res.status(200).json(service)
    }catch (error){
        console.error('Error creating a service', error);
        res.status(500).send('Internal Server Error');
    }
}

// delete a service
const deleteService = async (req, res) => {
    const { id } = req.params

    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Invalid id'})
        }

        const service = await Service.findOneAndDelete({_id: id})

        if(!service){
            return res.status(404).json({error: 'No such service'})
        }

        res.status(200).json(service)
    }catch (error){
        console.error('Error deleting a service', error);
        res.status(500).send('Internal Server Error');
    }
}


// update a service
const updateService = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid id'})
    }

    const {name, duration, organization_name} = req.body
    
    try{
        let emptyFields = []

        if(!name){
            emptyFields.push('name')
        }
        if(!duration){
            emptyFields.push('duration')
        }
        if(!organization_name){
            emptyFields.push('organization_name')
        }

        if(emptyFields.length > 0){
            return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
        }

        const organization_id = await Organization.findOne({name: organization_name})._id

        const service = await Service.findOneAndUpdate({_id: id}, {
            name, duration, organization_id
        })

        if(!service){
            return res.status(404).json({error: 'Service not Found'})
        }

        res.status(200).json(service)
    }catch (error){
        console.error('Error updating a service', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {
    getServices,
    getService,    
    createService,
    deleteService,
    updateService
}