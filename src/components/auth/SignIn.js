import React, { useState } from "react";
import logSvg from "../../assets/log.svg";
import classes from "./SignIn.module.css";
import Loader from "../loader/Loader";

export default function SignIn() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [load, setload] = useState(false);
  const [message, setmessage] = useState(null);

  async function login() {
    setload(true);

    const token = await fetch("http://localhost:3003/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => res.json());
    // .then((res) => console.log(res));

    if (token["status"] === "failed") {
      setmessage(token["message"]);
    }
    // console.log(message);

    token["status"] === "success"
      ? window.location.replace("http://localhost:3000/home")
      : setload(false);
  }

  return (
    <section className={classes.logIn}>
      <div className={`float-right max-w-max h-full ${classes.form_img}`}>
        <div>
          <img
            className={`h-screen ${classes.img_log}`}
            src={logSvg}
            alt="LogIn"
          />
        </div>
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
          <div className={`text-red-500 ${classes.form_elem}`}>{message}</div>
        </div>

        {load ? (
          <div className={`${classes.form_loader}`}>
            <Loader />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div></div>
    </section>
  );
}
