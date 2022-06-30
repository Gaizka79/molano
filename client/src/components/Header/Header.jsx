import React, {useState} from "react";
import Nav from './Nav';
import logo from '../../assets/logo.png';
import axios from "axios";

function Header () {
  const [ registerUsername, setRegisterUsername ] = useState("");
  const [ registerPassword, setRegisterPassword ] = useState("");
  const [ loginUsername, setLoginUsername ] = useState("");
  const [ loginPassword, setloginPassword ] = useState("");
  const [ data, setData ] = useState(null);
  const [ loginStatus, setLoginStatus ] = useState(false);
  const [ token, setToken ] = useState(null);

  const register = async () => {
    console.log(registerPassword + registerUsername);
    await axios({
      method: "POST",
      data:  {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/api/users/Signup"
    }).then((res) => console.log(res));
  };

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
      }
    })
      .catch(err => console.log(err.response.data));
  };

  const logOut = async () => {
    await axios({
      method: "GET",
      withCredentials: true,
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
        'myToken': localStorage.getItem("token")
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
      url: "http://localhost:5000/api/users/user"
    })
    .then((res) => {
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
      </header>
      <Nav/>
    </>
  )
  
}

export default Header;

/* function Header () {
  return (
    <>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Harategia</h1>
        <img src={logo} alt="logo" />
        
      </header>
      <Nav/>
    </>
  )
  
}

export default Header;
 */