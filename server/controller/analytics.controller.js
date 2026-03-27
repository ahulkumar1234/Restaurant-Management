const chefModel = require("../model/chef.model");
const orderModel = require("../model/order.model");
const tableModel = require("../model/table.model");





const getAnalytics = async (req, res) => {
  try {


    const totalOrders = await orderModel.countDocuments();

    const revenueResult = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    const uniqueClients = await orderModel.distinct("phone");
    const totalClients = uniqueClients.length;


    const totalChefs = await chefModel.countDocuments();

    res.status(200).json({
      totalChefs,
      totalOrders,
      totalRevenue,
      totalClients
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderSummary = async (req, res) => {
  try {

    const { filter } = req.query;

    let startDate = new Date();

    if (filter === "daily") {
      startDate.setHours(0, 0, 0, 0);
    }
    else if (filter === "weekly") {
      startDate.setDate(startDate.getDate() - 7);
    }
    else if (filter === "monthly") {
      startDate.setDate(startDate.getDate() - 30);
    }

    const orders = await orderModel.find({
      createdAt: { $gte: startDate }
    });

    const served = orders.filter(o => o.status === "served").length;
    const dineIn = orders.filter(o => o.type === "dine-in").length;
    const takeaway = orders.filter(o => o.type === "takeaway").length;
    const revenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);


    const revenueGraph = [0, 0, 0, 0, 0, 0, 0];

    orders.forEach(order => {
      const day = new Date(order.createdAt).getDay();
      revenueGraph[day] += order.totalAmount;
    });

    res.json({
      served,
      dineIn,
      takeaway,
      revenue,
      revenueGraph
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const chefAnalytics = async (req, res) => {
  try {
    const chefs = await chefModel.find();

    const chefStats = [];

    for (let chef of chefs) {
      const count = await orderModel.countDocuments({ chefId: chef._id });

      chefStats.push({
        name: chef.name,
        ordersTaken: count
      });
    }

    res.status(200).json({
      success: true,
      chefStats
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { getAnalytics, getOrderSummary, chefAnalytics };



