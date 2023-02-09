import React, { useState } from "react";
import logSvg from "../../assets/log.svg";
import classes from "./SignIn.module.css";
import Loader from "../loader/Loader";
import { userAction } from "../state/state";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const userDetail = useSelector((state) => state.userProfile.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [load, setload] = useState(false);
  const [message, setmessage] = useState(null);

  async function login() {
    try {
      setload(true);

      const token = await fetch("http://localhost:3005/login", {
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

      console.log(token);

      if (token["status"] === "failed") {
        setmessage(token["message"]);
      } else {
        dispatch(userAction.login(token["token"]));
        dispatch(userAction.set(token["user"]));
      }

      token["status"] === "success"
        ? navigate(`/account/${token["user"]}`)
        : setload(false);
    } catch (error) {
      setload(false);
      setmessage("Some problem occured!\nPlease try again later");
      // console.log("some problem occured please try again later");
    }
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
            {/* <button>Log In</button> */}
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
