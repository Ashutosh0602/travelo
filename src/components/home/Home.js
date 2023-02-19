import React from "react";
import classes from "./Home.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../state/state";

import noti from "../../assets/Notification.svg";
import setting from "../../assets/setting.svg";
import Post from "./post/Post";
import Trend from "./trend/Trend";

export default function Home() {
  const dispatch = useDispatch();
  const param = useParams();

  let token;
  let userProf;

  const userDetail = useSelector((state) => {
    token = state.userProfile.token;
    userProf = state.userProfile.user;
  });

  try {
    const userProfile = fetch(`http://localhost:3005/account/${param.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        dispatch(userAction.home(res["data"]));
      });
  } catch (error) {
    console.log("Some problem occured try again later");
  }

  return (
    <section className={`flex justify-around ${classes.home}`}>
      <div className={`w-2/4 ${classes.home_cont}	`}>
        <div className={`flex justify-between`}>
          <div>
            <input
              className={`rounded ${classes.input_search}`}
              type="text"
              placeholder="Enter your query"
            />
          </div>
          <div className={`flex justify-between`}>
            <div>
              <img src={noti} />
            </div>
            <div>
              <img src={setting} />
            </div>
          </div>
        </div>
        <div>
          <Post props={[token, param.userId]} />
        </div>
      </div>
      <div>
        <Trend />
      </div>
    </section>
  );
}
