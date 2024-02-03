const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    organization_id: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema);