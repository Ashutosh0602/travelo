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
  const [data, setdata] = useState(null);

  // const [data, setdata] = useState({ message: { profile: "" } });

  let img;

  try {
    useEffect(() => {
      page_load(props["props"]).then((res) => setdata(res["message"]));
      post_cont(data);
      // console.log("hello world");
    }, [page_load]);

    // for (let key in data) {
    //   console.log(data[key]);
    //   img = data[key]["gallery"].map((ls) => {
    //     let img_cont = (
    //       <img
    //         className={`${classes.post_img}`}
    //         src={`http://localhost:3005/img/gallery/${ls["photoID"][1]}`}
    //       />
    //     );
    //     return img_cont;
    //     console.log(ls["photoID"]);
    //   });
    // }

    // #Creating template for post image
  } catch (error) {
    seterrMess("Something went wrong!");
  }

  function post_cont(ls) {
    // console.log(ls);
    // console.log("hello");
    ls[0].map((gs) => console.log(gs));
  }

  return (
    <div>
      Post
      {/* {post_cont(data)} */}
    </div>
  );
};

export default Post;
