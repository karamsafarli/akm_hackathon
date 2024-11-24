const { Schema, model, models } = require('mongoose');


const carbonEmissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    emissionData: {
        type: String,
        required: true
    },
    humanizedEmissionData: {
        type: String,
        required: true
    }
}, { timestamps: true })

const CarbonEmission = models.CarbonEmission || model('CarbonEmission', carbonEmissionSchema)

module.exports = CarbonEmission