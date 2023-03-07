import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {collection, doc, setDoc} from "firebase/firestore";
import {db} from "../utils/firebase";

function UserPref(props) {
    const navigate = useNavigate();

    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('');
    const [clubs, setClubs] = useState('');

    function onSubmit(e) {
        e.preventDefault()
        const docRef = doc(db, "users", localStorage.getItem("recruitPlusUID"));
        setDoc(docRef, {
            school: {school},
            major: {major},
            clubs: {clubs}
        }).then(() => {
            console.log("Document successfully written!");
            navigate("/");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    return (
        <main>
            <section>
                <div>
                    <p>Provide us some more details</p>
                    <form>
                        <div>
                            <label htmlFor="school">
                                School
                            </label>
                            <input
                                type="text"
                                placeholder="EX. The University of Texas at Austin"
                                required
                                value={school}
                                onChange={(e) => setSchool(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="major">
                                Major
                            </label>
                            <input
                                type="text"
                                placeholder="EX. Computer Science"
                                required
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="Clubs or Organizations">
                                Clubs or Organizations Membership
                            </label>
                            <input
                                type="text"
                                placeholder="EX. Bevo Beekeepers"
                                value={clubs}
                                onChange={(e) => setClubs(e.target.value)}
                            />
                        </div>
                        <button type="submit" onClick={onSubmit}> Next </button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default UserPref;