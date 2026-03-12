import "./menuCard.css"
import { useEffect, useState } from 'react'
import axiosInstance from '../services/api';
import toast from "react-hot-toast";

const MenuCard = ({ search }) => {
  const [menu, setMenu] = useState([]);

  const [loading, setLoading] = useState(false)

  const getMenu = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/menu");
      setMenu(res.data.AllMenu || []);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(res.data.message)
    }
  }

  useEffect(() => {
    getMenu()
  }, [])

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {(loading && <div className="loader">
        <p>Please wait...</p>
      </div>)}
      <div className='menu-card'>
        {
          filteredMenu.map(item => (
            <div className="card" key={item._id}>
              <div className="items">
                <img src={item.image} alt="" />
                <p className="name">{item.name}</p>
                <p className="description">{item.description}</p>
                <p className="price">₹ <span>{item.price}</span></p>
                <p className="stock">Stock: <span>{item.stock}</span></p>
                <p className="PrePTime">PrepTime: <span>{item.averagePreparationTime} mins</span></p>
              </div>
            </div>
          ))
        }
      </div >
    </>
  )
}

export default MenuCard