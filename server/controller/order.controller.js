const chefModel = require("../model/chef.model");
const menuModel = require("../model/menu.model");
const orderModel = require("../model/order.model");
const tableModel = require("../model/table.model");


const createOrder = async (req, res) => {
    try {
        const { type, items, members, phone, instruction } = req.body;


        for (let item of items) {
            const menu = await menuModel.findById(item.menuId);
            if (!menu || menu.stock < item.quantity) {
                return res.status(400).json({ message: "Stock not available" });
            }
        }


        let totalAmount = 0;
        let totalProcessingTime = 0;

        for (let item of items) {
            const menu = await menuModel.findById(item.menuId);

            menu.stock -= item.quantity;
            await menu.save();

            totalAmount += menu.price * item.quantity;


            totalProcessingTime += menu.averagePreparationTime * item.quantity;
        }


        const chefs = await chefModel.find().sort({ currentOrders: 1 });
        const selectedChef = chefs[0];

        selectedChef.currentOrders = (selectedChef.currentOrders || 0) + 1;
        await selectedChef.save();


        let tableId = null;

        if (type === "dine-in") {
            const table = await tableModel.findOne({
                seats: { $gte: members },
                isReserved: false
            });

            if (!table) {
                return res.status(400).json({ message: "No table available" });
            }

            table.isReserved = true;
            await table.save();

            tableId = table._id;
        }


        const order = await orderModel.create({
            orderId: `ORD-${Date.now()}`,
            type,
            phone,
            items,
            tableId,
            chefId: selectedChef._id,
            totalAmount,
            status: "processing",
            processingStartTime: new Date(),
            totalProcessingTime,
            instruction
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            order
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const servedOrder = async (req, res) => {
    try {
        const { id } = req.params
        const order = await orderModel.findById(id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = "served";
        await order.save();


        const chef = await chefModel.findById(order.chefId);
        chef.currentOrders -= 1;
        await chef.save();


        if (order.type === "dine-in") {
            const table = await tableModel.findById(order.tableId);
            table.isReserved = false;
            await table.save();
        }

        res.status(200).json({
            success: true,
            message: "Order served"
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getOrders = async (req, res) => {
    try {

        const orders = await orderModel.find()
            .sort({ createdAt: -1 })
            .populate("tableId", "tableNumber")
            .populate("items.menuId", "name price")
            .populate("chefId", "name")

        const updatedOrders = [];

        for (let order of orders) {

            if (order.status === "processing") {

                const now = new Date();

                const elapsedTime = (now - order.processingStartTime) / 60000; // minutes

                const remainingTime = order.totalProcessingTime - elapsedTime;


                if (remainingTime <= 0) {

                    order.status = "served";
                    await order.save();


                    if (order.chefId) {

                        await chefModel.findByIdAndUpdate(
                            order.chefId._id,
                            { $inc: { currentOrders: -1 } },
                            { returnDocument: "after" }
                        );

                    }

                    if (order.type === "dine-in" && order.tableId) {
                        order.tableId.isReserved = false;
                        await order.tableId.save();
                    }
                }

                order._doc.remainingTime = Math.max(0, Math.ceil(remainingTime));
            } else {
                order._doc.remainingTime = 0;
            }

            updatedOrders.push(order);
        }

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders: updatedOrders
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { createOrder, servedOrder, getOrders }