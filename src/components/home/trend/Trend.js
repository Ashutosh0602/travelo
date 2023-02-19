import React from "react";
import classes from "./Trend.module.css";
import { Link } from "react-router-dom";

const Trend = () => {
  return (
    // <div>
    <>
      <div className={`${classes.place}`}>
        <h2 className={`font-black `}>Best place to visit</h2>
        <p>Texas, USA(United States of America)🇺🇸</p>
        <p>Edinburgh, UK(United Kingdom)🇬🇧</p>
        <p>Medellín, Colombia🇨🇴</p>
        <p>Glasgow, Scotland🏴󠁧󠁢󠁳󠁣󠁴󠁿</p>
        <p>Marrakech, Morocco🇲🇦</p>
        <p>Copenhagen, Denmark🇩🇰</p>
      </div>
      <div className={`${classes.place}`}>
        <h2 className={`font-black `}>Appreciating Community</h2>
        <p>The cruise Atlanta</p>
        <p>Embrosine Della</p>
        <p>Ajmer Rawana</p>
        <p>Hakuna Matata</p>
        <p>The Dibu Host</p>
        <p>Agenda Tillor</p>
        <p>
          <Link className={`${classes.more} `}>more...</Link>
        </p>
      </div>
      <div></div>
    </>
    // </div>
  );
};

export default Trend;
