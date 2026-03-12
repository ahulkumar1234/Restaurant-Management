import './menu.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AddDishForm from '../components/AddDishForm'
import MenuCard from '../components/MenuCard'
import { useState } from 'react'

const Menu = () => {

  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div className='menu-page'>

        <div className="navs">
          <Sidebar />
        </div>

        <div className="menu-container">
          <div className="form">
            <AddDishForm />
          </div>
          <div className="cards">
            <MenuCard search={search} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Menu