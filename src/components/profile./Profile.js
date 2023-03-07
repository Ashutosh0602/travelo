import React from "react";
import { useSelector } from "react-redux";
import classes from "./Profile.module.css";

import addProf from "../../assets/addProf.svg";

const Profile = () => {
  const userDetail = useSelector((state) => state.userProfile.user);

  try {
  } catch (error) {}
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
      <div>
        <h1 className="text-current">Ashutosh Rai</h1>
      </div>
    </section>
  );
};

export default Profile;
