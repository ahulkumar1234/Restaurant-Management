import { useEffect, useRef, useState } from 'react';
import './checkout.css'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import OrderType from '../components/OrderType';
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import axiosInstance from '../services/api';
import { toast } from 'react-hot-toast'

const CheckOut = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [modalopen, setmodalOpen] = useState(false);
  const [orderType, setOrderType] = useState("dine-in");
  const [userDetails, setUserDetails] = useState(null);
  const [instruction, setInstruction] = useState("");
  const [cart, setCart] = useState([]);

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const savedUser = JSON.parse(localStorage.getItem("userOrderDetails"));
    setUserDetails(savedUser);

  }, []);

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const itemTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const tax = Math.round(itemTotal * 0.05);

  const deliveryCharge = itemTotal < 500 ? 50 : 0;
  const grandTotal = itemTotal + deliveryCharge + tax;

  const createOrder = async () => {
    try {

      const userDetails = JSON.parse(localStorage.getItem("userOrderDetails"));

      const orderItems = cart.map(item => ({
        menuId: item._id,
        quantity: item.quantity
      }));

      const payload = {
        type: orderType,
        items: orderItems,
        members: userDetails.members,
        phone: userDetails.phone,
        instruction: instruction
      };

      const res = await axiosInstance.post("/order/create", payload);

      localStorage.removeItem("cart");
      toast.success(res.data.message);
      navigate('/success')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const removeItem = (id) => {

    const updatedCart = cart.filter(item => item._id !== id)

    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

  }

  const estimatedTime = cart.reduce(
    (total, item) =>
      total + item.averagePreparationTime * item.quantity,
    0
  );

  const getOrder = async () => {
    try {

      const res = await axiosInstance.get('/order')
    } catch (error) {
      toast.error(error.response.data)
    }
  }
  useEffect(() => {
    getOrder()
  }, [])



  const startSwipe = () => {
    setDragging(true);
  };

  const onSwipe = (e) => {
    if (!dragging) return;

    const containerWidth = containerRef.current.offsetWidth - 80;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const newX =
      clientX - containerRef.current.getBoundingClientRect().left;

    if (newX >= 0 && newX <= containerWidth) {
      setPosition(newX);
    }
  };

  const endSwipe = () => {
    setDragging(false);

    const containerWidth = containerRef.current.offsetWidth - 80;

    if (position >= containerWidth - 10) {
      createOrder();
    }

    setPosition(0);
  };

  return (
    <>
      <div className="checkout-container">
        <div className="heading">
          <h1>Good Morning</h1>
          <p>Place your order here</p>
        </div>
        <div className="search-inp">
          <img src="src/assets/search-button.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* instruction modal */}
        {(modalopen && <div className="modal-overlay">
          <button className="cross" onClick={() => { setmodalOpen(false) }}><RxCross1 /></button>
          <div className="modal-container">
            <div className="form-container">
              <h1>Add Cooking instructions </h1>
              <textarea type="text" onChange={(e) => setInstruction(e.target.value)} />
              <p>The restaurant will try its best to follow your request. However, refunds or cancellations in this regard won’t be possible</p>
            </div>
            <div className="btns">
              <button onClick={() => setmodalOpen(false)} className='cancdel'>Cancel</button>
              <button onClick={() => setmodalOpen(false)} className='next'>Next</button>
            </div>
          </div></div>)}


        {/* checkout-container */}
        {cart.map((item) => (
          <div className="selected-item" key={item._id}>
            <Link onClick={() => { setmodalOpen(true) }} className='instruction'>Add cooking instructions (optional)</Link>

            <div className="img">
              <img src={item.image} alt="" />
            </div>

            <div className="dets">
              <h1>{item.name}</h1>
              <p>₹ {item.price}</p>
              <div className="inc-dec-btns">
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>
            </div>
            <button className="cross-cancel" onClick={() => removeItem(item._id)}>
              <RxCross1 />
            </button>
          </div>
        ))}

        {instruction && (
          <p className="instruction-text">
            <span>Cooking Instruction</span>{instruction}
          </p>
        )}

        <div className="order-type">
          <OrderType orderType={orderType} setOrderType={setOrderType} />
        </div>


        <div className="price-summary">

          <div className="row">
            <p>Item Total</p>
            <p>₹ {itemTotal}</p>
          </div>

          {orderType === "dine-in" ? "" : <div className="row">
            <p id='delivery'>Delivery Charge</p>
            <p>₹ {deliveryCharge}</p>
          </div>}

          <div className="row">
            <p>Taxes</p>
            <p>₹ {tax}</p>
          </div>

          <div className="row grand">
            <p>Grand Total</p>
            <p>₹ {grandTotal}</p>
          </div>

        </div>

        <div className="details-section">

          <h3>Your details</h3>

          <div className="user-info">
            <p>{userDetails?.name}</p>
            <p>{userDetails?.phone}</p>
          </div>

          {orderType === "takeaway" && (
            <div className="address">
              <p>
                <FaLocationDot className='location' />
                Delivery at Home - {userDetails?.address}
              </p>
            </div>
          )}

          {orderType === "dine-in" ?
            <div className="delivery-time">
              <p>
                <FaClock className='clock' />
                Order ready in {estimatedTime} mins
              </p>
            </div>
            : <div className="delivery-time">
              <p>
                <FaClock className='clock' />
                Order delivered in {estimatedTime} mins
              </p>
            </div>
          }

        </div>



        <div className="swipe-container" ref={containerRef}>

          <div
            className="swipe-btn"
            style={{ transform: `translateX(${position}px)` }}
            onMouseDown={startSwipe}
            onMouseMove={onSwipe}
            onMouseUp={endSwipe}
            onMouseLeave={endSwipe}
          >
            <span className="arrow">
              <FaArrowRight />
            </span>
          </div>

          <p>Swipe to Order</p>

        </div>



      </div>
    </>
  )
}

export default CheckOut