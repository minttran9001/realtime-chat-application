import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser } from "../../actions";
export default function Header() {
  const auth = useSelector(state=>state.auth)
  return (
    <div className="header">
      <div className="navBar">
        <div className="navSide">
          <ul className="navWrap">
            <li className="navItem">
              <NavLink to="/" className="navLink">
                HOME
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/about" className="navLink">
                ABOUT
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="logoArea">
          <img src="https://www.williamdollace.it/wp-content/themes/williamdollacetheme/images/logo.svg" />
        </div>
        <div className="navSide">
          {!auth.authenticated ? <ul className="navWrap">
            <li className="navItem">
              <NavLink to="/login" className="navLink">
                LOGIN
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/signup" className="navLink">
                SIGN UP
              </NavLink>
            </li>
          </ul>:
          <ul className="navWrap">
          <li className="navItem">
          <NavLink to="/profile" className="navLink">
               {auth.firstName} PROFILE
              </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="/logout" className="navLink">
              LOG OUT
            </NavLink>
          </li>
        </ul>
          }
        </div>
      </div>
    </div>
  );
}
