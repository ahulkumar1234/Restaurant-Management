const express = require("express")
const { createMenu, getMenu, UpdateMenu, DeleteMenu } = require("../controller/menu.controller")
const upload = require('../middleware/upload.multer');
const router = express.Router()



router.post('/create', upload.single('image'), createMenu)

router.get('/', getMenu)

router.put('/update/:id', UpdateMenu)

router.delete('/delete/:id', DeleteMenu)




module.exports = router