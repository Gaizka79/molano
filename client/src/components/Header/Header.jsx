import React, { useState } from "react";
import Nav from './Nav';
import logo from '../../assets/logo.png';
import axios from "axios";

function Header () {
  const [ registerUsername, setRegisterUsername ] = useState("");
  const [ registerPassword, setRegisterPassword ] = useState("");
  const [ loginUsername, setLoginUsername ] = useState("");
  const [ loginPassword, setloginPassword ] = useState("");
  const [ data, setData ] = useState(null);

  const register = () => {
    axios({
      method: "POST",
      data:  {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/api/register"
    }).then((res) => console.log(res));
  };
  const login = async () => {
    console.log("inicio del loginaxios");
    console.log(loginUsername + loginPassword);
    try {
      const response = await axios({
        method: "POST",
        data: {
          username: loginUsername,
          password: loginPassword
        },
        withCredentials: true,
        url: "http://localhost:5000/api/login"
      });
      console.log(response);
    } catch (error) {
        console.log(error)
    };
    /* const response = await axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/api/login"
    }).then((res) => {
      console.log("el post del login con");
      console.log(res);
      }
    ); */
    console.log("findel axios");
    //console.log(response);
  };
  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/user"
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Harategia</h1>
        <img src={logo} alt="logo" />

        <div className="loginform">
          <div className="register">
            <h1>Register</h1>
            <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
            <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)} />
            <button onClick={register}>Submit</button>
          </div>
          <div className="login">
            <h1>Login</h1>
            <input placeholder="username" onChange={e => setLoginUsername(e.target.value)} />
            <input placeholder="password" onChange={e => setloginPassword(e.target.value)} />
            <button onClick={login} >Submit</button>
          </div>

          <div className="getUser">
            <h1>Get User</h1>
            <button onClick={getUser} >Submit</button>
            {
              data ? <h1>Welcome Back {data.username}</h1> : 
                null 
            }
          </div>
        </div>
      </header>
      <Nav/>
    </>
  )
  
}

export default Header;
