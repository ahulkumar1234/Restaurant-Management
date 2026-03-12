import "./Dashboard.css"
import Navbar from "../components/Navbar"
import { NavLink } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useState } from "react"
import axiosInstance from "../services/api"
import { useEffect } from "react"
import ProgressBars from "../components/Charts/ProgressBars"
import OrderSummaryDonut from "../components/OrderSummaryChart"
import RevenueChart from "../components/Charts/RevenueChart";

const Dashboard = () => {

    const [chefAnalytics, setChefAnalytics] = useState([]);
    const [orderSummary, setOrderSummary] = useState({})
    const [revenueData, setRevenueData] = useState([])
    const [analytics, setAnalytics] = useState({})
    const [filter, setFilter] = useState("daily");
    const [search, setSearch] = useState("")
    const [tables, setTables] = useState([]);

    const getTables = async () => {
        try {
            const response = await axiosInstance.get("/table");
            setTables(response.data.allTables);
        } catch (error) {
            console.log(error.message);
        }
    };

    const Analytics = async () => {
        try {
            const response = await axiosInstance.get("/analytics");
            setAnalytics(response.data)
        } catch (error) {
            console.error("Error fetching chef analytics:", error);
        }
    }

    const handleChefAnalytics = async () => {
        try {
            const response = await axiosInstance.get("/analytics/chefs");
            setChefAnalytics(response.data.chefStats);
        } catch (error) {
            console.error("Error fetching chef analytics:", error);
        }
    }

    useEffect(() => {
        handleChefAnalytics();
        Analytics();
        getTables();
    }, [])

    useEffect(() => {
        fetchOrderSummary();
    }, [filter]);

    const formatRevenue = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num;
    };

    const fetchOrderSummary = async () => {
        try {
            const response = await axiosInstance.get(`/analytics/summary?filter=${filter}`)
            setOrderSummary(response.data);
            setRevenueData(response.data.revenueGraph);
        } catch (error) {
            console.log(error)
        }
    }

    const isMatch = (text) => {
        if (!search) return true

        return text.toLowerCase().includes(search.toLowerCase())
    }

    return (
        <div className='body'>
            <Navbar search={search} setSearch={setSearch} />
            <div className="dashboard">
                <Sidebar />

                <div className="main-content">

                    <div className="stats">
                        <h1 className="heading">Analytics</h1>

                        <div className="boxes">
                            <div className={`box ${!isMatch("Total chef") ? "blur" : ""}`}>
                                <img src="/assets/Image.png" alt="" />
                                <div>
                                    <h2>{analytics.totalChefs}</h2>
                                    <p>Total chef</p>
                                </div>
                            </div>
                            <div className={`box ${!isMatch("Total Revenue") ? "blur" : ""}`}>
                                <img className="inr" src="/assets/ph_currency-inr-bold.png" alt="" />
                                <div>
                                    <h2>{formatRevenue(analytics.totalRevenue)}</h2>
                                    <p>Total Revenue</p>
                                </div>
                            </div>
                            <div className={`box ${!isMatch("Total Orders") ? "blur" : ""}`}>
                                <img src="/assets/Image (4).png" alt="" />
                                <div>
                                    <h2>{analytics.totalOrders}</h2>
                                    <p>Total Orders</p>
                                </div>
                            </div>
                            <div className={`box ${!isMatch("Total Clients") ? "blur" : ""}`}>
                                <img src="/assets/Image (2).png" alt="" />
                                <div>
                                    <h2>{analytics.totalClients}</h2>
                                    <p>Total Clients</p>
                                </div>
                            </div>
                        </div>

                        <div className="analytics">

                            <div className={`order-summary ${!isMatch("order summary") ? "blur" : ""}`}>
                                <div className="summary-legend">
                                    <h2 className="summary-heading">Order Summary</h2>
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="dropdowns">
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>

                                <div className="order-analytics">
                                    <div className="served">
                                        <h1 className="served-count">{orderSummary.served}</h1>
                                        <span>Served</span>
                                    </div>
                                    <div className="dine-in">
                                        <h1 className="dinein-count">{orderSummary.dineIn}</h1>
                                        <span>Dine In</span>
                                    </div>
                                    <div className="take-away">
                                        <h1 className="takeaway-count">{orderSummary.takeaway}</h1>
                                        <span>Take-away</span>
                                    </div>
                                </div>

                                <div className="chart">
                                    <OrderSummaryDonut
                                        served={orderSummary.served}
                                        dineIn={orderSummary.dineIn}
                                        takeaway={orderSummary.takeaway}
                                    />

                                    <ProgressBars
                                        served={orderSummary.served}
                                        dineIn={orderSummary.dineIn}
                                        takeaway={orderSummary.takeaway}
                                    />
                                </div>

                            </div>
                            <div className={`revenue ${!isMatch("revenue") ? "blur" : ""}`}>
                                <div className="revenue-legend">
                                    <h2 className="revenue-heading">Revenue</h2>
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="dropdowns">
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <div className="revenue-chart">
                                    <RevenueChart data={revenueData} />
                                </div>
                            </div>
                            <div className={`rest-tables ${!isMatch("tables") ? "blur" : ""}`}>
                                <div className="legend">
                                    <h2 className="tables-heading">Tables</h2>
                                    <div className="legend-item">
                                        <div className="green-dot"></div>
                                        <span>Reserved</span>
                                    </div>
                                    <div className="legend-item">
                                        <div className="white-dot"></div>
                                        <span>Available</span>
                                    </div>
                                </div>

                                <div className="rest-table">
                                    {
                                        tables.map(table => (
                                            <div className={`table ${table.isReserved ? "reserved" : ""}`} key={table._id}>
                                                <p>Table</p>
                                                <span>{table.tableNumber}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* chefs list table */}
                        <div className={`chefs ${!isMatch("Chef Name") ? "blur" : ""}`}>
                            <table className="table-chefs">
                                <thead>
                                    <tr>
                                        <th>Chef Name</th>
                                        <th>Order Taken</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chefAnalytics && chefAnalytics.map((chef, idx) => (
                                        <tr key={idx}>
                                            <td>{chef.name}</td>
                                            <td>{chef.ordersTaken}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard