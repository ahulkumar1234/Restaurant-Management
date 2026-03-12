const express = require("express")
const { tableCreate, getAllTable, updateTable, deleteTable } = require("../controller/table.controller")
const router = express.Router()


router.post("/create", tableCreate)

router.get("/", getAllTable)

router.put("/update/:id", updateTable)

router.delete("/delete/:id", deleteTable)






module.exports = router