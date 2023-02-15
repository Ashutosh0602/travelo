import React, { useEffect, useState } from "react";
import classes from "./Post.module.css";

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
  const [data, setdata] = useState({ message: { profile: "" } });

  let img;

  try {
    useEffect(() => {
      page_load(props["props"]).then((res) => setdata(res["message"]));
    }, [errMess]);
    for (let key in data) {
      data[key]["gallery"].map((ls) => {
        img = (
          <img
            className={`${classes.post_img}`}
            src={`http://localhost:3005/img/gallery/${ls["photoID"][1]}`}
          />
        );
        return img;
        console.log(ls["photoID"]);
      });
    }

    // #Creating template for post image
  } catch (error) {
    seterrMess("Something went wrong!");
  }

  return (
    <div>
      Post
      {img}
    </div>
  );
};

export default Post;
