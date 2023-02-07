import { createSlice } from "@reduxjs/toolkit";

// async function login(payload) {
//   const token = await fetch("http://localhost:3003/login", {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },

//     body: JSON.stringify({
//       email: payload[1],
//       password: payload[0],
//     }),
//   }).then((res) => res.json());

//   return [token];
// }

// async function home()

//It's initial state
const userState = {
  token: "",
  user: null,
};

//Here creating an action feature
const userSlice = createSlice({
  name: "userProfile",
  initialState: userState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    home(state, action) {
      state.user = action.payload;
    },
  },
});

export const UState = userState;
export const userAction = userSlice.actions;
export default userSlice.reducer;
