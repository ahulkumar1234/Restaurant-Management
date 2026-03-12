import './sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div>
            <div className="menu">
                <NavLink className={({isActive}) => isActive ? "active" : "" } to="/"><img src="/src/assets/dashboard-rounded.png" alt="Menu" /></NavLink>
                <NavLink className={({isActive}) => isActive ? "active" : "" } to="/tables"><img src="/src/assets/mdi_seat.png" alt="Tables" /></NavLink>
                <NavLink className={({isActive}) => isActive ? "active" : "" } to="/orders"><img src="/src/assets/bxs_food-menu.png" alt="Orders" /></NavLink>
                <NavLink className={({isActive}) => isActive ? "active" : "" } to="/menu"><img src="/src/assets/mdi_analytics.png" alt="Chefs" /></NavLink>
            </div>
        </div>
    )
}

export default Sidebar