import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { validateUrl, validateName } from "../utils/regex";

import "../modules/Onboarding.css";

function UserPreference(props) {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  let userId = "";
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
    } else {
      userId = user.uid;
    }
  });

  async function onSubmitPreferences(e) {
    e.preventDefault();

    if (validateName(name)) {
      setErrorMessage("Invalid name. Enter your full name.");
      return;
    } else if (school.length <= 2) {
      setErrorMessage("Invalid school. Enter the full name of your school.");
      return;
    } else if (!validateUrl(linkedin)) {
      setErrorMessage("Invalid LinkedIn profile URL.");
      return;
    }

    try {
      await setDoc(doc(db, "users", userId), {
        name: name,
        school: school,
        linkedin: linkedin,
      });
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;

      setErrorMessage(`${errorCode}: ${errorMessage}`);
    }
  }

  return (
    <div>
      <section>
        <p className="onboarding-title">One last step!</p>
        <form>
          <div className="margin-top-20px">
            <label htmlFor="first-last-name" className="input-title">
              Name
            </label>
            <input
              name="first-last-name"
              className="input-field"
              required
              placeholder="First and Last"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="margin-top-20px">
            <label htmlFor="school" className="input-title">
              School
            </label>
            <input
              name="school"
              className="input-field"
              required
              placeholder="School"
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>
          <div className="margin-top-20px">
            <label htmlFor="linkedin-profile" className="input-title">
              LinkedIn Profile
            </label>
            <input
              name="linkedin-profile"
              className="input-field"
              required
              placeholder="Enter URL"
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className="margin-top-20px">
            {(errorMessage !== "") && <p className="error-message">{errorMessage}</p> }
            <button className="onboarding-button" onClick={onSubmitPreferences}>
              Finish
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default UserPreference;
