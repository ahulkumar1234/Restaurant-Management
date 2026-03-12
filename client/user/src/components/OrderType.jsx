import "./orderType.css";

const OrderType = ({ orderType, setOrderType }) => {

  return (
    <div className="order-type">

      <div className="tabs">

        <div
          className={orderType === "dine-in" ? "tab active" : "tab"}
          onClick={() => setOrderType("dine-in")}
        >
          Dine In
        </div>

        <div
          className={orderType === "takeaway" ? "tab active" : "tab"}
          onClick={() => setOrderType("takeaway")}
        >
          Take Away
        </div>

      </div>

    </div>
  );
};

export default OrderType;