import React from "react";
import world from "../../assets/Destination.svg";
// import world from "../../assets/Travelers.svg";
import classes from "./SignUp.module.css";
import { Link } from "react-router-dom";

export default function SignUp() {
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
            <input id="First" type="text" placeholder="First Name" />
          </div>
          <div>
            <div>
              <label for="last">Last Name</label>
            </div>
            <input id="last" type="text" placeholder="Last Name" />
          </div>
          <div>
            <div>
              <label for="email">Email</label>
            </div>
            <input id="email" type="email" placeholder="Email" />
          </div>
          <div>
            <div>
              <label for="passcode">Passowrd</label>
            </div>
            <input id="passcode" type="password" placeholder="Password" />
          </div>
          <div>
            <div>
              <label for="password">Confirm Passowrd</label>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
}
