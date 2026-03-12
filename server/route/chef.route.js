const express = require("express")
const router = express.Router()
const { createChef, getAllChef, updateChef, deleteChef } = require("../controller/chef.controller")






router.post('/create', createChef)

router.get('/', getAllChef)

router.put('/update/:id', updateChef)

router.delete('/delete/:id', deleteChef)






module.exports = router