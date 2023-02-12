import React, { useEffect, useState } from "react";

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

  //   let img;

  const img = useEffect(() => {
    page_load(props["props"]).then((res) => setdata(res));

    // img = <img src={data["message"]["profile"]} />;
    // return () => <img src={data["message"]["profile"]} />;
  }, [page_load]);

  try {
    console.log(data);
  } catch (error) {
    seterrMess("Something went wrong!");
  }

  return (
    <div>
      Post
      {/* {img} */}
      <img src={data["message"]["profile"]} />
    </div>
  );
};

export default Post;
