import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateLayout = () => {
  const { currentUser } = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  // If there's no currentUser, redirect to /signin

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return currentUser ? <Outlet /> : null;
};

export default PrivateLayout;
