const express = require("express")
const { createOrder, servedOrder, getOrders } = require("../controller/order.controller")
const router = express.Router()




router.post("/create", createOrder)

router.get("/", getOrders)

router.put("/served/:id", servedOrder)








module.exports = router