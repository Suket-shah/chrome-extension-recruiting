import React from "react";

import {NavLink, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import RecruitGPTTitleModule from "../modules/RecruitGPTTitleModule";
import styles from "../styles/InputStyle";

function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function onLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("recruitPlusAuthToken", JSON.stringify(user?.accessToken));
                localStorage.setItem("recruitPlusUID", JSON.stringify(user?.uid));
                navigate("/userPref");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div>
            <div>
                <RecruitGPTTitleModule />
            </div>
            <section>
                <p style={styles.welcomeStyle}>Welcome! Lets upgrade your job search.</p>

                <form>
                    <div style={styles.inputDivStyle}>
                        <label style={styles.labelStyle} htmlFor="email-address">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            style={styles.inputStyle}
                            required
                            placeholder="Email address"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={styles.labelStyle} htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            style={styles.inputStyle}
                            required
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <p style={styles.switchStyle}>
                        Don't have an account? <NavLink to="/signup">Sign up</NavLink>
                    </p>
                    <div>
                        <button style={styles.buttonStyle} type="submit" onClick={onLogin} >
                            Login
                        </button>
                    </div>
                </form>

            </section>
        </div>

    )
}

export default Login;