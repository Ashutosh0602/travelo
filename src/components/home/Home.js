import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../state/state";

export default function Home() {
  const dispatch = useDispatch();
  const param = useParams();

  let token;
  let userProf;

  const userDetail = useSelector((state) => {
    token = state.userProfile.token;
    userProf = state.userProfile.user;
  });

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
      console.log(res);
      dispatch(userAction.home(res["data"]));
    });

  console.log(userProf);

  return <div>Home</div>;
}
