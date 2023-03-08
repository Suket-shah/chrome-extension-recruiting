import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../utils/firebase";

function UserPref(props) {
    const navigate = useNavigate();

    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('');
    const [clubs, setClubs] = useState('');

    const [isLoading, setIsLoading] = useState(true);

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
    // start the ping to the firestore to see if data is set.. in meantime, show loading screen
    // if data is set, then redirect to home page
    // if data is not set, then show the page
    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        let ignore = false;
        checkIfDocExists();
        return () => { ignore = true; };
    }, [isLoading]);

    async function checkIfDocExists() {
        const docRef = doc(db, "users", localStorage.getItem("recruitPlusUID"));
        try {
            getDoc(docRef).then((docRefResponse) => {
                if (docRefResponse.exists()) {
                    setIsLoading(false);
                    navigate("/");
                } else {
                    setIsLoading(false);
                }
            });
        } catch (e) {
            console.log("Error getting document for user preferences:", e);
        }
    }

    if (isLoading) {
        return <p>Loading...</p>
    } else {
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
}

export default UserPref;