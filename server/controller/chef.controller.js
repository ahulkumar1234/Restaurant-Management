const chefModel = require("../model/chef.model")



const createChef = async (req, res) => {
    try {

        const { name, currentOrders } = req.body

        if (!name, !currentOrders) {
            res.status(400).json({
                success: false,
                message: "All fields required!"
            })
        }

        const newChef = await chefModel.create({
            name,
            currentOrders,
        });

        res.status(201).json({
            success: true,
            message: "Chef Created Succesfully!",
            newChef
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllChef = async (req, res) => {
    try {

        const AllChef = await chefModel.find({})

        if (AllChef.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Chef's found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "All Chef's fetched succesfully!",
            AllChef
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateChef = async (req, res) => {
    try {

        const { id } = req.params
        const { name, currentOrders } = req.body

        const chef = await chefModel.findById(id)

        if (!chef) {
            return res.status(404).json({
                success: false,
                message: "Chef not found!"
            })
        }

        const updatedChef = await chefModel.findByIdAndUpdate(id, {
            name,
            currentOrders
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Chef updated successfully!",
            updatedChef
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteChef = async (req, res) => {
    try {

        const { id } = req.params

        const chef = await chefModel.findById(id)

        if (!chef) {
            return res.status(404).json({
                success: false,
                message: "Chef not found!"
            })
        }

        await chefModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Chef deleted successfully!"
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { createChef, getAllChef, updateChef, deleteChef }