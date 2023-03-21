import React, {useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import {NavLink, useNavigate} from "react-router-dom";
import styles from "../styles/InputStyle";
import RecruitGPTTitleModule from "../modules/RecruitGPTTitleModule";

function Signup(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    function onSubmit(e) {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
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
        <main >
            <div>
                <RecruitGPTTitleModule />
            </div>
            <section>
                <p style={styles.welcomeStyle}>Welcome! Lets upgrade your job search.</p>
                    <div>
                        <form>
                            <div style={styles.inputDivStyle}>
                                <label style={styles.labelStyle} htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={styles.inputStyle}
                                    required
                                    placeholder="Email address"
                                />
                            </div>

                            <div>
                                <label style={styles.labelStyle} htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={styles.inputStyle}
                                    required
                                    placeholder="Password"
                                />
                            </div>
                            <p style={styles.switchStyle}>
                                Already have an account?{' '}
                                <NavLink to="/login" >
                                    Sign in
                                </NavLink>
                            </p>
                            <button
                                type="submit"
                                style={styles.buttonStyle}
                                onClick={onSubmit}
                            >
                                Sign up
                            </button>
                        </form>
                </div>
            </section>
        </main>
    );
}

export default Signup;