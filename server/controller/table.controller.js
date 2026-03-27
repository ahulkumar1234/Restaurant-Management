const tableModel = require("../model/table.model")




const tableCreate = async (req, res) => {
    try {

        const { tableNumber, seats, isReserved } = req.body

        const table = await tableModel.findOne({ tableNumber })

        const totalTables = await tableModel.countDocuments();

        if (totalTables >= 30) {
            return res.status(400).json({
                success: false,
                message: "Maximum 30 tables allowed"
            });
        }

        if (table) {
            return res.status(400).json({
                success: false,
                message: "Table number already exists!"
            })
        }

        const newTable = await tableModel.create({
            tableNumber,
            seats,
            isReserved
        })
        
        res.status(201).json({
            success: true,
            message: "Table Created Successfully!",
            newTable
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllTable = async (req, res) => {
    try {

        const allTables = await tableModel.find({})

        if (allTables.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tables found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "All Tables Fetched Successfully!",
            allTables
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateTable = async (req, res) => {
    try {
        const { id } = req.params
        const { tableNumber, seats, isReserved } = req.body

        const table = await tableModel.findById(id)

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found!"
            })
        }

        const updatedTable = await tableModel.findByIdAndUpdate(id, {
            tableNumber,
            seats,
            isReserved
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Table Updated Successfully!",
            updatedTable
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteTable = async (req, res) => {
    try {
        const { id } = req.params

        const table = await tableModel.findById(id)

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found!"
            })
        }

        if (table.isReserved) {
            return res.status(400).json({
                success: false,
                message: "Reserved table cannot be deleted!"
            })
        }

        const deletedTableNumber = table.tableNumber


        await tableModel.findByIdAndDelete(id)


        await tableModel.updateMany(
            { tableNumber: { $gt: deletedTableNumber } },
            { $inc: { tableNumber: -1 } }
        )

        res.status(200).json({
            success: true,
            message: "Table Deleted Successfully!"
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = { tableCreate, getAllTable, updateTable, deleteTable }