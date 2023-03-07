import React from "react";

import {NavLink, useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

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
        <section>
            <p>Login to RecruiterPlus</p>

            <form>
                <div>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder="Email address"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" onClick={onLogin} >
                        Login
                    </button>
                </div>
            </form>
            <p>
                Don't have an account? <NavLink to="/signup">Sign up</NavLink>
            </p>
        </section>
    )
}

export default Login;