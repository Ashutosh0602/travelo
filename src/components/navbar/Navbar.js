import React from "react";
import classes from "./Navbar.module.css";
import homeSvg from "../../assets/home.svg";
import chatSvg from "../../assets/Chat.svg";
import exploreSvg from "../../assets/explore.svg";
import packSvg from "../../assets/pack.svg";
import profileSvg from "../../assets/profile.svg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userId = useSelector((state) => state.userProfile.userId);

  return (
    <section className={`${classes.Navbar}`}>
      <div className={classes.Navbar_cont}>
        <div>
          <NavLink
            className={(navdata) =>
              navdata.isActive ? classes.icon : classes.icon_de
            }
            to={`/account/${userId}`}
          >
            <img className="w-9/12 p-2 " src={homeSvg} />
            {/* <svg>{homeSvg}</svg> */}
          </NavLink>
        </div>
        <div>
          <NavLink
            className={(navdata) =>
              navdata.isActive ? classes.icon : classes.icon_de
            }
            to={`/account/${userId}/chat`}
          >
            <img className="w-9/12 p-2" src={chatSvg} />
          </NavLink>
        </div>
        <div>
          <NavLink
            className={(navdata) =>
              navdata.isActive ? classes.icon : classes.icon_de
            }
            to={`/account/${userId}/explore`}
          >
            <img className="w-9/12 p-2" src={exploreSvg} />
          </NavLink>
        </div>
        <div>
          <NavLink
            className={(navdata) =>
              navdata.isActive ? classes.icon : classes.icon_de
            }
            to={`/account/${userId}/package`}
          >
            <img className="w-9/12 p-2" src={packSvg} />
          </NavLink>
        </div>
        <div>
          <NavLink
            className={(navdata) =>
              navdata.isActive ? classes.icon : classes.icon_de
            }
            to={`/account/${userId}/profile`}
          >
            <img className="w-9/12 p-2" src={profileSvg} />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
