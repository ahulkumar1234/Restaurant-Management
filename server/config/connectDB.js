const mongoose = require('mongoose')
const envVariables = require('../config/envVariables')


const connectDB = async () => {
    try {
        await mongoose.connect(envVariables.MONGO_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


Object.freeze(connectDB)

module.exports = connectDB