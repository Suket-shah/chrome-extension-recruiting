import React from "react";

import {NavLink, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { validateEmail } from "../utils/regex";

import "../modules/Onboarding.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/");
    }
  });

  async function onLogin(e) {
    e.preventDefault();

    if (password.length < 8) {
      setLoginErrorMessage("Invalid password");
      return;
    } else if (!validateEmail(email)) {
      setLoginErrorMessage("Invalid email");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        setLoginErrorMessage("Invalid password");
      } else if (errorCode === "auth/user-not-found") {
        setLoginErrorMessage("User not found");
      } else if (errorCode === "auth/invalid-email") {
        setLoginErrorMessage("Invalid email");
      } else if (errorCode === "auth/missing-email") {
        setLoginErrorMessage("Missing email");
      } else if (errorCode === "auth/missing-password") {
        setLoginErrorMessage("Missing password");
      } else {
        setLoginErrorMessage(errorMessage);
      }
    }
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
              className="input-field password"
              required
              placeholder="Secret Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="margin-top-30px">
            {(loginErrorMessage !== "") && <p className="error-message">{loginErrorMessage}</p>}
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
