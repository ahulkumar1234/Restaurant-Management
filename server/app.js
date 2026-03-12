const express = require('express');
const app = express()
const envVariables = require('./config/envVariables');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/connectDB');
const cors = require("cors")
const MenuRouter = require('./route/menu.route')
const ChefRouter = require('./route/chef.route')
const TableRouter = require('./route/table.route')
const OrderRouter = require('./route/order.route')
const AnalyticsRouter = require("./route/analytics.route")

connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("Hello World");
});






// Rest api's
app.use('/api/v1/menu', MenuRouter)
app.use('/api/v1/chef', ChefRouter)
app.use('/api/v1/table', TableRouter)
app.use('/api/v1/order', OrderRouter)
app.use('/api/v1/analytics', AnalyticsRouter)



const port = envVariables.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
