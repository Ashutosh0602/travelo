import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

const Home = React.lazy(() => import("./components/home/home"));
const Package = React.lazy(() => import("./components/package/Package"));
const Profile = React.lazy(() => import("./components/profile./Profile"));
const Traveller = React.lazy(() => import("./components/traveller/Traveller"));
const SignUp = React.lazy(() => import("./components/auth/SignUp"));
const SignIn = React.lazy(() => import("./components/auth/SignIn"));

export const App = () => {
  return;
  <Routes></Routes>;
};
