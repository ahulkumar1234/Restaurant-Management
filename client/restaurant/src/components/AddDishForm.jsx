import { useRef, useState } from "react"
import "./addDishForm.css"
import axiosInstance from "../services/api";
import toast from "react-hot-toast";

const AddDishForm = () => {

    const fileInputRef = useRef(null);
    const [loading, setloading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        averagePreparationTime: "",
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };


    //submitForm
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setloading(true)
            const form = new FormData();
            form.append("name", formData.name);
            form.append("description", formData.description);
            form.append("price", formData.price);
            form.append("stock", formData.stock);
            form.append("averagePreparationTime", formData.averagePreparationTime);
            form.append("image", formData.image);

            const res = await axiosInstance.post('/menu/create', form, { withCredentials: true });

            toast.success(res.data.message)

            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                averagePreparationTime: "",
                image: null
            });

            fileInputRef.current.value = "";
            setloading(false)
        } catch (error) {
            setloading(false)
            toast.error(error.res?.data?.message || "Something went wrong");
        }
    }

    return (
        <>
            <div className="form-container">

                <form className="dish-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            ref={fileInputRef}
                            onChange={handleImage}
                        />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter dish name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            placeholder="Enter description"
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            name="price"
                            onChange={handleChange}
                            value={formData.price}
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            placeholder="Enter stock"
                            name="stock"
                            onChange={handleChange}
                            value={formData.stock}
                        />
                    </div>

                    <div className="form-group">
                        <label>Average Preparation Time</label>
                        <input
                            type="number"
                            placeholder="Time in minutes"
                            name="averagePreparationTime"
                            onChange={handleChange}
                            value={formData.averagePreparationTime}
                        />
                    </div>

                    <button className={loading ? "disabled-btn":"add-btn"} type="submit">
                        {loading ? "Adding..." : "Add New Dish"}
                    </button>

                </form>

            </div>
        </>
    )
}

export default AddDishForm