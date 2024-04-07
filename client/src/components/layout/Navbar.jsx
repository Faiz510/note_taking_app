import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.user.currentUser);

  const baseurl = `${process.env.BASE_URL}/img/`;
  const ImgUrl = `${baseurl}${currentUser?.user?.photo}`;

  return (
    <nav className="flex justify-between items-center bg-slate-600 text-white gap-4 px-2 md:px-10 py-2">
      <div className="text-2xl font-semibold tracking-wider">
        <span className="text-slate-300">Notes</span>
        <span className="text-slate-100">App</span>
      </div>
      <ul className="flex gap-2">
        <li>
          <NavLink to={"/"}> Home </NavLink>
        </li>
        {currentUser ? (
          <li>
            <NavLink to={"/profile"}>
              <img src={ImgUrl} className="w-8 h-8 rounded-full object-cover" />
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to={"/signup"}> Signup </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
