const MenuModel = require("../model/menu.model")


const createMenu = async (req, res) => {
    try {
        const { name, description, price, stock, averagePreparationTime } = req.body


        if (!name || !description || !price || !stock || !averagePreparationTime) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const imageUrl = req.file?.path;

        const newMenu = await MenuModel.create({
            name,
            description,
            price,
            stock,
            averagePreparationTime,
            image: imageUrl
        });

        return res.status(201).json({
            success: true,
            message: "Menu Created Successfully!",
            newMenu
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getMenu = async (req, res) => {
    try {

        const AllMenu = await MenuModel.find({})

        if (AllMenu.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No menu found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "All Menu Fetched Successfully!",
            AllMenu
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const UpdateMenu = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, price, category, averagePreparationTime, stock } = req.body

        const menu = await MenuModel.findById(id)

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found!"
            })
        }

        const updatedMenu = await MenuModel.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            averagePreparationTime,
            stock
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Menu Updated Successfully!",
            updatedMenu
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const DeleteMenu = async (req, res) => {
    try {
        const { id } = req.params


        const menu = await MenuModel.findById(id)

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found!"
            })
        }

        await MenuModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Menu Deleted Successfully!"
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}





module.exports = { createMenu, getMenu, UpdateMenu, DeleteMenu }