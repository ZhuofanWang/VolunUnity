const mongoose = require('mongoose')

const Schema = mongoose.Schema

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    address: {
        type: String,
        required: true
    },
    phoneNumber: Number,
    email: String,
    link: String,
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
    }]
}, { timestamps: true })

module.exports = mongoose.model('Organization', organizationSchema);