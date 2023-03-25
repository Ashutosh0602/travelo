import React, { useState } from "react";
import world from "../../assets/Destination.svg";
// import world from "../../assets/Travelers.svg";
import classes from "./SignUp.module.css";
import { Link, Navigate, json, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [Fname, setFname] = useState(null);
  const [Sname, setSname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCpassword] = useState(null);
  const [errMess, setErrMess] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

  async function create() {
    const obj = {
      name: `${Fname} ${Sname}`,
      email: email,
      password: password,
      passwordConfirm: cpassword,
      city: city,
      country: country,
    };
    // console.log(obj);

    const token = await fetch("http://localhost:3000/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        obj,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == "success") {
          navigate("/signIn");
        }
      });

    console.log(token);
  }

  return (
    <section className={classes.signup}>
      <div className={classes.signup_img}>
        <img src={world} />
      </div>
      <div className={classes.signup_form}>
        <div className={classes.cancel}>
          <span>
            <Link to="/signIn">X</Link>
          </span>
        </div>
        <div className={classes.form_cont}>
          <div>
            <div>
              <label for="First">First Name</label>
            </div>
            <input
              id="First"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label for="last">Last Name</label>
            </div>
            <input
              id="last"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setSname(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label for="email">Email</label>
            </div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label for="passcode">Passowrd</label>
            </div>
            <input
              id="passcode"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label for="password">Confirm Passowrd</label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setCpassword(e.target.value);
                if (e.target.value === password) {
                  console.log(cpassword);
                  return setErrMess("");
                }
                setErrMess("The password is not matching!!");
              }}
            />
            <p className="text-red-500">{errMess}</p>
          </div>
          <div>
            <button onClick={create}>Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
}
