import { useState } from "react";
import CategoryTab from "../components/CategoryTab"
import MenuCard from "../components/MenuCard"
import "./userMenu.css"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserMenu = () => {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState("Pizza");
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(true);

    const [cart, setCart] = useState([]);

    const increaseQty = (item) => {

        const exist = cart.find((i) => i._id === item._id);

        if (exist) {
            setCart(
                cart.map((i) =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }

    };

    const decreaseQty = (item) => {

        const exist = cart.find((i) => i._id === item._id);

        if (!exist) return;

        if (exist.quantity === 1) {
            setCart(cart.filter((i) => i._id !== item._id));
        } else {
            setCart(
                cart.map((i) =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                )
            );
        }

    };

    const [userDetails, setUserDetails] = useState({
        name: "",
        members: "",
        address: "",
        phone: ""
    });

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleOrderNow = () => {
        localStorage.setItem("userOrderDetails", JSON.stringify(userDetails));
        setShowForm(false);
    };

    const handleNext = () => {
        if (cart.length === 0) {
            toast.error("Please add items to cart");
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        navigate("/checkout");
    };

    return (
        <>
            <div className="menu-container">

                {showForm && (
                    <div className="form">
                        <div className="inputs">
                            <h1>Enter Your Details</h1>

                            <label>Name</label>
                            <input name="name" onChange={handleChange} type="text" placeholder="Full Name" />

                            <label>Number of Person</label>
                            <input name="members" onChange={handleChange} type="text" placeholder="2,4,6" />

                            <label>Address</label>
                            <input name="address" onChange={handleChange} type="text" placeholder="address" />

                            <label>Contact</label>
                            <input name="phone" onChange={handleChange} type="text" placeholder="phone" />

                            <button
                                type="submit"
                                className="order-btn"
                                onClick={handleOrderNow}
                            >
                                Order Now
                            </button>

                        </div>
                    </div>
                )}

                <div className="heading">
                    <h1>Good Morning</h1>
                    <p>Place your order here</p>
                </div>
                <div className="search-inp">
                    <img src="/assets/search-button.png" alt="" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="categories">
                    <CategoryTab setSelectedCategory={setSelectedCategory} />
                </div>
                <h1 className="menu-heading">{selectedCategory}</h1>
                <div className="menu-items">
                    <MenuCard
                        selectedCategory={selectedCategory}
                        search={search}
                        cart={cart}
                        increaseQty={increaseQty}
                        decreaseQty={decreaseQty}
                    />
                </div>
                <div className="next-btn">
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        </>
    )
}

export default UserMenu