const express = require("express")
const { getAnalytics, getOrderSummary, chefAnalytics } = require("../controller/analytics.controller")
const router = express.Router()





router.get('/', getAnalytics)

router.get("/summary", getOrderSummary);

router.get('/chefs', chefAnalytics)

module.exports = router