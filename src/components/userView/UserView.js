import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./UserView.module.css";
import addProf from "../../assets/addProf.svg";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const UserView = (props) => {
  const param = useParams();
  console.log(param);

  const userDetail = useSelector((state) => state.userProfile.user);

  return (
    <section className={classes.profile}>
      <div className="relative">
        <div className={`${classes.coverpage}`}>
          <img src={`http://localhost:3000/img/template/cover.jpg`} />
        </div>
        <div className={`absolute ${classes.profileCover}`}>
          <div className="relative">
            <div>
              <img
                src={`http://localhost:3000/img/users/${userDetail?.profilePhoto}`}
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
            {userDetail?.id}
          </div>
          <div className="font-thin text-sm text-center text-slate-400">
            {userDetail?.city},{userDetail?.country}🇮🇳
          </div>
          <div className={`flex justify-evenly mt-8 ${classes.prof_main_but}`}>
            <div className="flex justify-center items-center">
              <span className="text-xl">Travello</span>
            </div>
            <div>
              <div>{userDetail?.Travellers}</div>
              <div>Traveller</div>
            </div>
          </div>
        </div>
        <div className={`${classes.post_cont}`}>
          {/* <div className={`${classes.addPost}`}>
            <label form="upload">
              <img id="upload" className={classes.post_svg} src={post} />
              <input
                id="upload"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files);
                  postPhoto();
                }}
                multiple="multiple"
              />
            </label>
          </div> */}
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default UserView;
