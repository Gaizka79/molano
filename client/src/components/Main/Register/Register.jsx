import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register () {

  const [ registerUsername, setRegisterUsername ] = useState("");
  const [ registerPassword, setRegisterPassword ] = useState("");
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

  return (
    <div className="register">
      <h1>Register</h1>
      <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
      <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)} />
      <button onClick={register}>Submit</button>
      <p className="signup-page__text animate__animated animate__fadeIn">
        Tienes cuenta? <Link to="/Login" className="signup-page__link">Log in</Link>
      </p>
    </div>
  )
}


export default Register;
