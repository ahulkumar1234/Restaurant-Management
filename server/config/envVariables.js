const dotenv = require("dotenv")
dotenv.config()

const envVariables = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,

    cloudinary: {
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.CLOUD_KEY,
        apiSecret: process.env.CLOUD_SECRET,
    },


}


module.exports = envVariables