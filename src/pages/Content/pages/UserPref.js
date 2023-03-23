import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../utils/firebase";
import styles from "../styles/InputStyle";

function UserPref(props) {
    const navigate = useNavigate();

    const [school, setSchool] = useState('')
    const [major, setMajor] = useState('');
    const [clubs, setClubs] = useState('');
    const [name, setName] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [validSchool, setValidSchool] = useState(true);
    const [validMajor, setValidMajor] = useState(true);
    const [validName, setValidName] = useState(true);

    function onSubmit(e) {
        e.preventDefault()

        // client side validation
        if (name.length < 2) {
            setValidName(false);
            return;
        }
        setValidName(true);
        if (school.length < 3) {
            setValidSchool(false);
            return;
        }
        setValidSchool(true);
        if (major.length < 3) {
            setValidMajor(false);
            return;
        }
        setValidMajor(true);

        // upload document
        const docRef = doc(db, "users", localStorage.getItem("recruitPlusUID"));
        setDoc(docRef, {
            name: {name},
            school: {school},
            major: {major},
            clubs: {clubs}
        }).then(() => {
            console.log("Document successfully written!");
            navigate("/");
        }).catch((error) => {
            alert("Error uploading user preferences");
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
                        <p style={styles.welcomeStyle}>Tell us about yourself</p>
                        <form>
                            <div>
                                <label
                                    style={styles.labelStyle}
                                    htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="EX. John Doe"
                                    style={styles.inputStyle}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {!validName && <p style={styles.invalidStyle}>Name must be at least 2 characters</p>}
                            </div>
                            <div style={styles.inputDivStyle}>
                                <label
                                    style={styles.labelStyle}
                                    htmlFor="school">
                                    School
                                </label>
                                <input
                                    type="text"
                                    placeholder="EX. UT Austin"
                                    style={styles.inputStyle}
                                    value={school}
                                    onChange={(e) => setSchool(e.target.value)}
                                />
                                {!validSchool && <p style={styles.invalidStyle}>Must enter valid university name</p>}
                            </div>
                            <div style={styles.inputDivStyle}>
                                <label
                                    style={styles.labelStyle}
                                    htmlFor="major">
                                    Major
                                </label>
                                <input
                                    type="text"
                                    placeholder="EX. Computer Science"
                                    style={styles.inputStyle}
                                    value={major}
                                    onChange={(e) => setMajor(e.target.value)}
                                />
                                {!validMajor && <p style={styles.invalidStyle}>Major name must be at least 3 characters</p>}
                            </div>
                            <div style={styles.inputDivStyle}>
                                <label
                                    style={styles.labelStyle}
                                    htmlFor="Clubs or Organizations">
                                    Clubs or Organizations
                                </label>
                                <input
                                    type="text"
                                    placeholder="EX. Bevo Beekeepers"
                                    style={styles.inputStyle}
                                    value={clubs}
                                    onChange={(e) => setClubs(e.target.value)}
                                />
                            </div>
                            <button
                                style={styles.buttonStyle}
                                type="submit"
                                onClick={onSubmit}>
                                Next
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        )
    }
}

export default UserPref;