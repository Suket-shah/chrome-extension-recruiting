import React from 'react';

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserPref from "../pages/UserPref";

import { HashRouter as Router} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from "../utils/PrivateRoutes";



function App(props) {
    const [authToken, setAuthToken] = React.useState(null);
    const [test, setTest] = React.useState(null);

    console.log("app is being rendered");
    return (
        <Router>
            <div>
                <section>
                    <Routes>
                        <Route element={<PrivateRoutes/>} authToken={authToken}>
                            <Route path="/" element={<Home onWidthChange={props.onWidthChange}/>} ></Route>
                            <Route path="/userPref" element={<UserPref/>} ></Route>
                        </Route>
                        <Route path="/login" element={<Login/>} setAuthToken={setAuthToken} setTest={setTest} test={test}/>
                        <Route path="/signup" element={<Signup/>} setAuthToken={setAuthToken}/>
                    </Routes>
                </section>
            </div>
        </Router>
    )
}

export default App;