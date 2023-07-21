import React, {useEffect} from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { validateUrl, validateName } from "../utils/regex";

import Footbar from "../modules/Footbar";
import "../modules/Onboarding.css";

let personalData = null;
let userId = "";
function Settings(props) {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [linkedinProfile, setLinkedinProfile] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  useEffect(() => {
    if (userId) {
      getPersonalData(userId);
    }
  }, [navigate]);

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      navigate("/login");
    } else {
      userId = user.uid;
      if (personalData === null) {
        getPersonalData(userId);
      }
    }
  });

  async function getPersonalData(userId) {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        personalData = docSnap.data();
        document.querySelector('.input-name').value = personalData.name;
        setName(personalData.name);
        document.querySelector('.input-school').value = personalData.school;
        setSchool(personalData.school);
        document.querySelector('.input-linkedin').value = personalData.linkedin;
        setLinkedinProfile(personalData.linkedin);
        return personalData;
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveData(e) {
    e.preventDefault();

    if (!validateName(name)) {
      setErrorMessage("Invalid name. Enter your full name.");
      return;
    } else if (!validateUrl(linkedinProfile)) {
      setErrorMessage("Invalid Linekding Profile. Enter full URL.");
      return;
    } else if (school.length <= 2) {
      setErrorMessage("Invalid school. Enter the full name of your school.");
      return;
    }

    try {
      await setDoc(doc(db, "users", userId), {
        name: name,
        school: school,
        linkedin: linkedinProfile,
      });
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;

      setErrorMessage(`${errorCode}: ${errorMessage}`);
    }
  }

  function logout(e) {
    e.preventDefault();
    auth.signOut();
    navigate("/login");
  }

  return (
    <div>
      <section>
        <p className="onboarding-title">Profile</p>
        <form>
          <div className="margin-top-20px">
            <label htmlFor="name" className="input-title">
              Name
            </label>
            <input name="name" className="input-field input-name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="margin-top-20px">
            <label htmlFor="school" className="input-title">
              School
            </label>
            <input name="school" className="input-field input-school" onChange={(e) => setSchool(e.target.value)}/>
          </div>
          <div className="margin-top-20px">
            <label htmlFor="linkedin" className="input-title">
              Linkedin Profile
            </label>
            <input name="linkedin" className="input-field input-linkedin" onChange={(e) => setLinkedinProfile(e.target.value)} />
          </div>
          <div>
            {(errorMessage !== "") && <p className="error-message">{errorMessage}</p> }
            <button className="onboarding-button margin-top-20px" onClick={saveData}>Save</button>
          </div>
          <div>
            <button className="onboarding-button margin-top-20px" onClick={logout}>Logout</button>
          </div>
        </form>
      </section>
      <Footbar />
    </div>
  );
}

export default Settings;
