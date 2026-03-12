import './orders.css'
import { useEffect, useState } from "react"
import axiosInstance from "../services/api"
import OrderCard from "../components/OrderCard"
import toast from 'react-hot-toast'


const Orders = () => {

  const [orders, setOrders] = useState([])

  const [loading, setLoading] = useState(false)

  const getOrders = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/order")

      setOrders(res.data.orders)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message || "Something went wrong")
    }

  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      {loading && (
        <div className="loader">
          <p>Please wait...</p>
        </div>
      )}

      <div className="order-line">

        <h2>Order Line</h2>

        <div className="order-grid">

          {orders.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}

        </div>

      </div>
    </>
  )

}

export default Orders