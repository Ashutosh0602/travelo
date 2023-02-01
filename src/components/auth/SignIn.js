import React from "react";
import logSvg from "../../assets/log.svg";
import classes from "./SignIn.module.css";

export default function SignIn() {
  return (
    <section className={classes.logIn}>
      <div className={`float-right max-w-max h-full ${classes.form_img}`}>
        <img
          className={`h-screen ${classes.img_log}`}
          src={logSvg}
          alt="LogIn"
        />
        <div className={`${classes.form}`}>
          <div className={classes.form_elem}>
            <input placeholder="Username" />
          </div>
          <div className={classes.form_elem}>
            <input placeholder="Password" />
          </div>
          <div className={` ${classes.form_elem}`}>
            <button>Log In</button>
          </div>
          <div className={classes.form_elem}>
            <button>Create New Account</button>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
