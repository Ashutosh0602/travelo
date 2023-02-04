import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import classes from "./Home.module.css";

export default function Home() {
  const param = useParams();
  const userDetail = useSelector((state) => state.userProfile.user);
  console.log(userDetail);

  fetch(`http://localhost:3003/account/${param.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWY1ZDlmODM1MzgxNzhiM2RmY2U3YSIsImlhdCI6MTY3MjUwMzgyNiwiZXhwIjoxNjgwMjc5ODI2fQ.hTb-PJUUBg5ja3MDYo1sjFWCf5b_ptb7YIRiNMO4gjQ`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res)); // console.log(props.user);
  console.log(param);
  return <div>Home</div>;
}
