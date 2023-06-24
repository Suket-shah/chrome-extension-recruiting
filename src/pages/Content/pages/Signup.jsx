import React from "react";

import {NavLink, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

import "../modules/Onboarding.css";

function Signup(props) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validLogin, setValidLogin] = React.useState(true);

  // TODO: Better Error Handeling
  // TODO: Make character black out on password
  function onLogin(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("recruitPlusAuthToken", JSON.stringify(user?.accessToken));
        localStorage.setItem("recruitPlusUID", JSON.stringify(user?.uid));
        props.setAuthToken(user?.accessToken);
        navigate("/userPref");
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
          <div className="margin-top-20px">
            <label htmlFor="conf-password" className="input-title">
              Confirm Password
            </label>
            <input
              id="conf-password"
              name="conf-password"
              className="input-field"
              required
              placeholder="Same as above"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="margin-top-30px">
            {!validLogin && <p className="error-message">Invalid login credentials</p>}
            <button className="onboarding-button" type="submit" onClick={onLogin} >
              Sign Up
            </button>
          </div>
          <div className="flex margin-top-15px">
            <hr className="margin-left-6"/>
            <p className="margin-surrounding-10px">or</p>
            <hr/>
          </div>
          <div>
            <button className="onboarding-button" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Signup;
