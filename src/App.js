import "./App.css";

function App() {
  // fetch("http://localhost:3003/signUp", {
  //   method: "POST",
  //   mode: "cors",
  //   // cache: "no-cache",
  //   // credentials: "same-origin",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: {
  //     name: "Steve Jobs",
  //     id: "@Steve_job",
  //     email: "setevew@gmail.com",
  //     password: "12345qwerty",
  //     passwordConfirm: "12345qwerty",
  //     city: "San Francisco",
  //     country: "USA",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
  fetch("http://localhost:3003/", {
    method: "GET",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
  return <div className="App">Hello world</div>;
}

export default App;
