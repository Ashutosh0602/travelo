import React, { useEffect, useState } from "react";
import classes from "./Post.module.css";
import anchor from "../../../assets/anchor.svg";
import comment from "../../../assets/Comment.svg";
import love from "../../../assets/love.svg";
import { json } from "react-router-dom";

async function page_load(props) {
  const userProfile = await fetch(
    `http://localhost:3005/account/${props[1]}/home`,
    {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "image/jpeg",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${props[0]}`,
      },
    }
  ).then((res) => res.json());
  return userProfile;
}

const Post = (props) => {
  const [errMess, seterrMess] = useState(null);
  const [data, setdata] = useState(null);

  // console.log(props);
  // const [data, setdata] = useState({ message: { profile: "" } });

  let img;

  try {
    useEffect(() => {
      page_load(props["props"]).then((res) => setdata(res["message"]));
      post_cont(data);
      // console.log("hello world");
    }, [page_load]);
  } catch (error) {
    seterrMess("Something went wrong!");
  }

  // #Creating template for post image
  function post_cont(ls) {
    const post = ls[0].map((gs) => {
      // console.log(gs);
      const cont = gs["gallery"].map((ph) => {
        let count =
          ph["count"]["heart"] +
          ph["count"]["Funny"] +
          ph["count"]["Love"] +
          ph["count"]["Happy"];
        const img = (
          <div className={classes.post_div} key={ph["_id"]}>
            <div>
              {gs["userID"]} /
              <span className={classes.city_name}>{ph["city"]}</span>
            </div>
            {/* <div className={classes.city_name}>{ph["city"]}</div> */}
            <div className={`flex overflow-scroll my-1.5 ${classes.img_cont}`}>
              {ph["photoID"].map((arr) => {
                const img_arr = (
                  // <div className={classes.img_slide}>
                  <img
                    // key={}
                    src={`http://localhost:3005/img/gallery/${arr}`}
                  />
                  // </div>
                );
                return img_arr;
              })}
            </div>
            <div className="flex justify-between">
              <div className="flex w-20 justify-between">
                {/* <div> */}
                <div>
                  <img className={classes.bottom_svg} src={love} />
                </div>
                {/* </div> */}
                <div>
                  <img className={classes.bottom_svg} src={comment} />
                </div>
              </div>
              <div>
                <img className={classes.bottom_svg} src={anchor} />
              </div>
            </div>
            {count > 0 ? (
              <div>Enjoyed by {ph["count"]["heart"]} explorer</div>
            ) : (
              <div></div>
            )}
            <div></div>
          </div>
        );
        return img;
      });
      return cont;
    });
    return post;
  }

  return <div className={``}>{post_cont(data)}</div>;
};

export default Post;
