import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./success.css";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {

  const navigate = useNavigate();
  const [time, setTime] = useState(3);

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirect);
    };

  }, [navigate]);

    return (
        <div className="success-container">
            <div className="success-card">
                <h1>Thank you for your Order!</h1>
                <FaCheckCircle className="success-icon"/>
            </div>
            <p className="redirect">Redirecting in {time} seconds...</p>
        </div>
    );
};

export default Success;