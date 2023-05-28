import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Profile.module.css";

import addProf from "../../assets/addProf.svg";
import post from "../../assets/post.svg";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Profile = (props) => {
  // console.log(props);
  const param = useParams();
  const [file, setFile] = useState();

  useEffect(() => {
    var filt;
    try {
      filt = props["post"][0].filter(
        (e) => e["userID"] == "@dheeraj_dhyiurai_024"
      );
      console.log(filt);
    } catch (error) {
      console.log("not found");
    }
  }, [props]);

  const userDetail = useSelector((state) => state.userProfile.user);

  // console.log(userDetail);

  const postPhoto = async () => {
    const formData = new FormData();
    formData.append("name", param["userId"]);
    formData.append("newPhoto", file);
    formData.forEach((e) => console.log(e));
    await fetch("http://localhost:3000/uploadGallery", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data boundary=MyBoundary",
      // },
      body: formData,
    })
      .then((response) => response.json())
      .then((js) => {
        if (js["status"] == "failed") {
          // toast(`Incomplete or Inappropriate data`, {
          //   duration: 4000,
          //   position: "top-center",

          //   // Styling
          //   style: {},
          //   className: "",

          //   // Custom Icon
          //   icon: "❗️",

          //   // Change colors of success/error/loading icon
          //   iconTheme: {
          //     primary: "#000",
          //     secondary: "#fff",
          //   },

          //   // Aria
          //   ariaProps: {
          //     role: "status",
          //     "aria-live": "polite",
          //   },
          // });
          toast.error("Incomplete or Inappropriate Data");
        } else {
          toast.success("Upload Success");
        }
      });
  };

  const userPost = async () => {
    await fetch("");
  };
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
          <div className={`${classes.addPost}`}>
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
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default Profile;
