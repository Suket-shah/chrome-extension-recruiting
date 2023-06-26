import React from "react";

import {NavLink, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { validateEmail } from "../utils/regex";

import "../modules/Onboarding.css";

function Signup(props) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [signupErrorMessage, setSignupErrorMessage] = React.useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/userPref");
    }
  });

  async function onSignup(e) {
    e.preventDefault();

    if (password.length < 8) {
      setSignupErrorMessage("Weak Password Make it at least 8 characters");
      return;
    } else if (!validateEmail(email)) {
      setSignupErrorMessage("Invalid email");
      return;
    } else if (password !== confirmPassword) {
      setSignupErrorMessage("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        setSignupErrorMessage("Weak Password Make it at least 8 characters");
      } else if (errorCode === "auth/missing-email") {
        setSignupErrorMessage("Missing email");
      } else if (errorCode === "auth/missing-password") {
        setSignupErrorMessage("Missing password");
      } else {
        setSignupErrorMessage(errorMessage);
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
              className="input-field password"
              required
              placeholder="Same as above"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="margin-top-30px">
            {(signupErrorMessage !== "") && <p className="error-message">{signupErrorMessage}</p>}
            <button className="onboarding-button" type="submit" onClick={onSignup} >
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
