import { useState, useEffect } from "react";
import Index from ".";
import { db } from "../api/config";
import { deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { getData } from "../../api";
import styles from "../../styles/Letter.module.css";

function Letter() {
    const [letters, setletters] = useState([]);

    const [emotion, setEmotion] = useState("");
    const [letterText, setLetterText] = useState("");

    const [loading, setLoading] = useState("");

    useEffect(() => {
        const run = async () => {
            const response = await getData("letter");
            setletters(response);
        };

        run();
    }, []);

    const handleChange = async (id, text) => {
        const temp = [...letters];

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id == id) {
                temp[i].letter = text;
                break;
            }
        }

        setletters(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const temp = {
            letter: letterText,
        };

        const dbRef = doc(db, "letter", emotion);
        await setDoc(dbRef, temp);

        temp["id"] = emotion;
        setletters([...letters, temp]);

        setEmotion("");
        setLetterText("");

        setLoading(false);
    };

    const handleUpdate = async (data) => {
        setLoading(true);

        const temp = { ...data };

        const id = temp.id;
        delete temp["id"];

        const dbRef = doc(db, "letter", id);
        await updateDoc(dbRef, temp);

        setLoading(false);
    };

    const handleDelete = async (id) => {
        setLoading(true);

        const dbRef = doc(db, "letter", id);
        await deleteDoc(dbRef);

        let temp = [...letters];

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                temp.splice(i, 1);
                break;
            }
        }

        setletters(temp);

        setLoading(false);
    };

    return (
        <div className={styles.main}>
            <Index />

            <form onSubmit={handleSubmit}>
                <label>Emotion</label>
                <input
                    type="text"
                    onChange={(e) => setEmotion(e.target.value)}
                    value={emotion}
                />

                <label>Text On Letter</label>
                <input
                    type="text"
                    onChange={(e) => setLetterText(e.target.value)}
                    value={letterText}
                />

                <button type="submit" disabled={loading || !emotion.length}>
                    Add
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Emotion</th>
                        <th>Text On Card</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {letters.map((letter) => (
                        <tr key={letter.id}>
                            <td>{letter.id}</td>
                            <td>
                                <input
                                    type="text"
                                    value={letter.letter}
                                    onChange={(e) =>
                                        handleChange(letter.id, e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleUpdate(letter)}
                                    disabled={loading}
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(letter.id)}
                                    disabled={loading}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Letter;
