import React from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser, logout } from "../../actions";
import Logo from "../../images/100ppi/Asset 2.png";
export default function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(auth.uid));
  };
  return (
    <div className="header">
      <div className="navBar">
        <NavLink to='/realtime-chat-application' className="logoArea">
          <img src={Logo} alt="logo" />
        </NavLink>
        <div className="navSide">
          {!auth.authenticated ? (
            <ul className="navWrap">
              <li className="navItem">
              <NavLink to="/realtime-chat-application" className="navLink">
                Message
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/newfeed" className="navLink">
                New Feed
              </NavLink>
            </li>
              <li className="navItem">
                <NavLink to="/login" className="navLink">
                  Login
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink to="/signup" className="navLink">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navWrap">
              <li className="navItem">
              <NavLink to="/realtime-chat-application" className="navLink">
                Message
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink to="/newfeed" className="navLink">
                New Feed
              </NavLink>
            </li>
              <li className="navItem">
                <NavLink
                  to={{
                    pathname: `/profile/${auth.uid}`,
                    state: { uid: auth.uid },
                  }}
                  className="navLink"
                >
                  {auth.firstName} Profile
                </NavLink>
              </li>
              <li className="navItem">
                <Link to="#" onClick={handleLogout} className="navLink">
                  Log out
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
