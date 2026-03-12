import "./ordercard.css"
import { useEffect, useState } from "react"

const OrderCard = ({ order }) => {

  const [time, setTime] = useState("")

  // timer calculate
  useEffect(() => {

    const interval = setInterval(() => {

      const diff = Math.floor(
        (Date.now() - new Date(order.processingStartTime)) / 60000
      )

      const hours = Math.floor(diff / 60)
      const minutes = diff % 60

      if (hours > 0) {
        setTime(`${hours}h ${minutes}`)
      } else {
        setTime(`${minutes}`)
      }

    }, 1000)

    return () => clearInterval(interval)

  }, [order.processingStartTime])


  const getCardClass = () => {

    if (order.type === "takeaway") {
      return "card-takeaway"
    }

    if (order.status === "processing") {
      return "card-processing"
    }

    if (order.status === "served") {
      return "card-served"
    }

    return ""
  }

  const getButtonClass = () => {

    if (order.status === "served") {
      return "btn-served"
    }

    if (order.type === "dine-in" && order.status === "processing") {
      return "btn-processing"
    }

    if (order.type === "takeaway") {
      return "btn-takeaway"
    }

    return ""
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  return (

    <div className={`order-card ${getCardClass()}`}>

      <div className="order-header">

        <div className="order-left">

          <div className="order-id">
            <img src="/src/assets/Vector (1).png" alt="" /> # {order.orderId.slice(-4)}
          </div>

          <div className="table-info">
            Table - {order.tableId?.tableNumber}
          </div>

          <div className="time">
            {formatTime(order.createdAt)}
          </div>


          <p className="item-count">
            {order.items.length} Item
          </p>

        </div>

        <div className="order-type">

          {order.status === "served" ? (

            <span className="badge done">
              Done <br /> Served
            </span>

          ) : order.type === "dine-in" ? (

            <span className="badge dine">
              Dine In <br /> Ongoing : {time} Min
            </span>

          ) : (

            <span className="badge take">
              Take Away <br />  Not Picked Up
            </span>

          )}

        </div>

      </div>

      {/* ITEMS */}

      <div className="items-box">

        {order.items.map((item, i) => (
          <p key={i}>
            {item.quantity} x {item.menuId?.name}
          </p>
        ))}

      </div>



      {/* BUTTON */}

      <button className={`order-btn ${getButtonClass()}`}>

        {order.status === "served"
          ? "Order Done ✔"
          : order.type === "dine-in"
            ? "Processing ⏳"
            : "Order Done ✔"}

      </button>


    </div>
  )

}

export default OrderCard