import { useState } from 'react';
import './category.css'

const CategoryTab = ({ setSelectedCategory }) => {

    const [activeCategory, setActiveCategory] = useState("Pizza");
    const categories = [
        {
            name: "Pizza",
            img: "/assets/pizza.png"
        },
        {
            name: "Burger",
            img: "/assets/burger.png"
        },
        {
            name: "French Fries",
            img: "/assets/fries.png"
        },
        {
            name: "Drink",
            img: "/assets/drink.png"
        },
        {
            name: "Veggies",
            img: "/assets/vegies.png"
        }
    ];
    return (
        <>
            <div className="categories">
                {categories.map((cat, index) => (
                    <div className="category" key={index} onClick={() => setSelectedCategory(cat.name)}>
                        <div className={activeCategory === cat.name ? "items-active" : "items"} onClick={() => setActiveCategory(cat.name)}>
                            <img src={cat.img} alt={cat.name} />
                            <p>{cat.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CategoryTab