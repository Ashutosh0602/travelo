import React, { useState } from "react";
import logSvg from "../../assets/log.svg";
import classes from "./SignIn.module.css";

export default function SignIn() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  async function login() {
    console.log(email, password);
    await fetch("http://localhost:3003/login", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

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
            <input
              placeholder="Username"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className={classes.form_elem}>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className={` ${classes.form_elem}`}>
            <button onClick={login}>Log In</button>
          </div>
          <div className={classes.form_elem}>
            <button>Create New Account</button>
          </div>
          <div className="text-slate-700">
            <span className="cursor-pointer">Forgot password?</span>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
