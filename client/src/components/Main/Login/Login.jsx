import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login () {
  const [ registerUsername, setRegisterUsername ] = useState("");
  const [ registerPassword, setRegisterPassword ] = useState("");
  const [ loginUsername, setLoginUsername ] = useState("");
  const [ loginPassword, setloginPassword ] = useState("");
  const [ data, setData ] = useState(null);
  const [ loginStatus, setLoginStatus ] = useState(false);
  const [ token, setToken ] = useState(null);

  

  const login = async () => {
    //const data = { 'user': loginUsername, 'password': loginPassword};

    //const options = { method: "POST", headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(data)};

    await axios({
      method: "POST",
      data:  {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/api/users/Login"
    }).then((res) => {
      if (!res.data.auth) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
        console.log(loginStatus);
      }
    })
      .catch(err => console.log(err.response.data));
  };

  const restore = async () =>{
    await axios({
      method: "GET",
      params: {user: loginUsername},
      withCredentials: true,
      url: "http://localhost:5000/api/users/Restore"
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  }

  const logOut = async () => {
    await axios({
      method: "GET",
      withCredentials: true,
      //Authorization: "JWT" + localStorage.getItem("JWT"),
      url: "http://localhost:5000/api/users/Logout"
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  const isLogged = async () => {

    await axios({
      method: "GET",
      withCredentials: true,
      headers: {
        'myToken': localStorage.getItem("token"),
        Authorization: 'myToken' + localStorage.getItem('token')
      },
      url: "http://localhost:5000/api/users/isUserAuth"
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(`No estás logeado y tenemos el error: ${err}`));
  }
  
  const getUser = async () => {
    await axios({
      method: "GET",
      withCredentials: true,
      headers: {
        'myToken': localStorage.getItem("token"),
        Authorization: localStorage.getItem('token')
      },
      url: "http://localhost:5000/api/users/User"
    })
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <>
      <div className="loginform">
        <div className="login">
          <h1>Login</h1>
          <input placeholder="username" onChange={e => setLoginUsername(e.target.value)} />
          <input placeholder="password" onChange={e => setloginPassword(e.target.value)} />
          <button onClick={login} >Submit</button>
          <a className="restorePassword" onClick={restore}>Recuperar contraseña</a>
        </div>
        <p className="login-page__text">
            Need an account? <Link to="/register" className="login-page__link animate__animated animate__fadeIn">Registro</Link>
        </p>

        <div className="getUser">
          <h1>Get User</h1>
          <button onClick={getUser} >Submit</button>
          {
            data ? <h1>Welcome Back {data.user}</h1> : 
              null 
          }
        </div>
        <div className="logout">
          <h1>Logout</h1>
          <button onClick={logOut}>Logout</button>
        </div>
        <div className="isLogged">
          <h1>Estoy logeado??</h1>
          <button onClick={isLogged}>Logeado??</button>
        </div>
      </div>
      <div className="loginStatus">
          {loginStatus && <button> Check if Authenticated</button>}

      </div>
    </>
  )
}

export default Login;
