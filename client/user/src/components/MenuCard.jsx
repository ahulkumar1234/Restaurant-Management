import './menucard.css'
import { useState, useEffect } from 'react';
import axiosInstance from '../services/api';

const MenuCard = ({ search, selectedCategory, cart, increaseQty, decreaseQty }) => {
    const [menu, setMenu] = useState([]);

    const [loading, setLoading] = useState(false)

    const getMenu = async () => {
        try {

            const res = await axiosInstance.get("/menu")
            setMenu(res.data.AllMenu)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMenu()
    }, [])

    const filteredMenu = menu.filter((item) => {

        const matchSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory = item.name
            .toLowerCase()
            .includes(selectedCategory.toLowerCase());

        if (search) return matchSearch;

        return matchCategory;

    });

    const getQty = (item) => {
        const exist = cart.find((i) => i._id === item._id);
        return exist ? exist.quantity : 0;
    };


    return (
        <>
            <div className='menu-cards'>
                {
                    filteredMenu.map((item) => {
                        return (
                            <div className="card" key={item._id}>
                                <img src={item.image} alt="" />

                                <div className="content">
                                    <span className='name'>{item.name}</span>
                                    <span className='price'>₹ {item.price}</span>
                                    <span>{item.category}</span>
                                    <div className="count">

                                        {getQty(item) === 0 ? (

                                            <button onClick={() => increaseQty(item)}>+</button>

                                        ) : (

                                            <div className="qty-controller">
                                                <button onClick={() => decreaseQty(item)}>-</button>
                                                <span>{getQty(item)}</span>
                                                <button onClick={() => increaseQty(item)}>+</button>
                                            </div>

                                        )}

                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MenuCard