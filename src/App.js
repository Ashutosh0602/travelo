import { useState } from "react";
import "./App.css";

function App() {
  const [file, setfile] = useState(null);
  const [name, setname] = useState(null);

  // console.log(name);

  const postPhoto = async () => {
    const formData = new FormData();
    formData.append("id", name);
    formData.append("profilePhoto", file);

    console.log(formData.forEach((e) => console.log(e)));
    await fetch("http://localhost:3003/completeProfile", {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data boundary=MyBoundary",
      // },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  // fetch("http://localhost:3003/", {
  //   method: "GET",
  //   // mode: "no-cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  // },
  // })
  // .then((res) => res.json())
  // .then((res) => console.log(res));
  return (
    <div className="App">
      Hello world
      {/* <form
        enctype="multipart/form-data"
        method="POST"
        action="http://localhost:3003/completeProfile"
      >
        <input
          onChange={(e) => {
            setfile(e.target.files[0]);
          }}
          type="file"
          alt="image"
          name="profilePhoto"
        />
        <input name="id" type="text" />
        <input type="submit" />
      </form> */}
      <input
        onChange={(e) => {
          setfile(e.target.files[0]);
        }}
        type="file"
        alt="image"
        name="profilePhoto"
      />
      <input onChange={(e) => setname(e.target.value)} name="id" type="text" />
      <button onClick={postPhoto}>Submit</button>
    </div>
  );
}

export default App;
