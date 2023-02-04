import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Loader from "./components/loader/Loader";
import Error from "./components/error/Error";

const Home = React.lazy(() => import("./components/home/Home"));
const Package = React.lazy(() => import("./components/package/Package"));
const Profile = React.lazy(() => import("./components/profile./Profile"));
const Traveller = React.lazy(() => import("./components/traveller/Traveller"));
const SignUp = React.lazy(() => import("./components/auth/SignUp"));
const SignIn = React.lazy(() => import("./components/auth/SignIn"));

export default function App() {
  return (
    <Suspense
      fallback={
        <>
          <Loader />
        </>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/signIn" />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="username" element={<SignUp />} />
        <Route path="account/:userId" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}
