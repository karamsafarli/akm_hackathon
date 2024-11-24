const CarbonEmission = require("../models/carbonEmission");


const postCarbonEmission = async (req, res) => {
    try {
        const userId = req.user.id;
        const { emissionData, calculatedEmission, humanizedEmissionData, sectionRates, recommendations } = req.body;
        const ce = await CarbonEmission.create({ userId, calculatedEmission, emissionData, humanizedEmissionData, sectionRates, recommendations })
        return res.status(201).json({ message: 'CeO2 posted successfully!', ce });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' });
    }
}


const getCarbonEmission = async (req, res) => {
    try {
        const userId = req.user.id;
        const carbonEmission = await CarbonEmission.findOne({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(carbonEmission);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' });
    }
}


module.exports = {
    postCarbonEmission,
    getCarbonEmission
}