import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Profile.module.css";

import addProf from "../../assets/addProf.svg";
import post from "../../assets/post.svg";
import { useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams();

  const userDetail = useSelector((state) => state.userProfile.user);

  const [file, setFile] = useState();

  const postPhoto = async () => {
    const formData = new FormData();
    formData.append("name", param["userId"]);
    formData.append("newPhoto", file);

    // console.log(formData.forEach((e) => console.log(e)));
    formData.forEach((e) => console.log(e));
    // console.log(formData);
    await fetch("http://localhost:3005/uploadGallery", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data boundary=MyBoundary",
      // },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <section className={classes.profile}>
      <div className="relative">
        <div className={`${classes.coverpage}`}>
          <img src={`http://localhost:3005/img/template/cover.jpg`} />
        </div>
        <div className={`absolute ${classes.profileCover}`}>
          <div className="relative">
            <div>
              <img
                src={`http://localhost:3005/img/users/${userDetail.profilePhoto}`}
              />
            </div>
            <div className={` ${classes.addProfile}`}>
              <img src={addProf} />
            </div>
          </div>
        </div>
      </div>
      <div className={`flex ${classes.prof_cont}`}>
        <div>
          <div className={`font-black text-xl text-center`}>
            {userDetail.id}
          </div>
          <div className="font-thin text-sm text-center text-slate-400">
            {userDetail.city},{userDetail.country}🇮🇳
          </div>
          <div className={`flex justify-evenly mt-8 ${classes.prof_main_but}`}>
            <div className="flex justify-center items-center">
              <span className="text-xl">Travello</span>
            </div>
            <div>
              <div>{userDetail.Travellers}</div>
              <div>Traveller</div>
            </div>
          </div>
        </div>
        <div className={`${classes.post_cont}`}>
          <div className={`${classes.addPost}`}>
            <label form="upload">
              <img id="upload" className={classes.post_svg} src={post} />
              <input
                id="upload"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  postPhoto();
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
