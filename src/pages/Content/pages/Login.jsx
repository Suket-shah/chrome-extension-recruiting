import React from "react";

import {NavLink, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

import "../modules/Onboarding.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validLogin, setValidLogin] = React.useState(true);

  // TODO: Better Error Handeling
  // TODO: Use Firebase Emulator Suite
  // TODO: use monitorAuthState
  // TODO: Get rid of storing the data in local storage completely
  // TODO: move from .then .catch to async await
  function onLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("recruitPlusAuthToken", JSON.stringify(user?.accessToken));
        localStorage.setItem("recruitPlusUID", JSON.stringify(user?.uid));
        props.setAuthToken(user?.accessToken);
        navigate("/userPref"); // TODO: change this to main page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setValidLogin(false);
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div>
      <section>
        <p className="onboarding-title">Let's get started</p>
        <form>
          <div className="margin-top-20px">
            <label htmlFor="email-address" className="input-title">
              Email
            </label>
            <input
              name="email"
              className="input-field"
              required
              placeholder="Example@email.com"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="margin-top-20px">
            <label htmlFor="password" className="input-title">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="input-field"
              required
              placeholder="At least 8 characters"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="margin-top-30px">
            {!validLogin && <p className="error-message">Invalid login credentials</p>}
            <button className="onboarding-button" type="submit" onClick={onLogin} >
              Login
            </button>
          </div>
          <div className="flex margin-top-15px">
            <hr className="margin-left-6"/>
            <p className="margin-surrounding-10px">or</p>
            <hr/>
          </div>
          <div>
            <button className="onboarding-button" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;