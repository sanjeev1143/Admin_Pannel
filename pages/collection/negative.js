import { useState, useEffect } from "react";
import Index from ".";
import { getData } from "../../api";
import { db } from "../api/config";
import { setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import styles from "../../styles/Negative.module.css";

function Negative() {
    const [emotionList, setEmotionList] = useState([]);

    const [emotion, setEmotion] = useState("");
    const [breatheTitle, setBreatheTitle] = useState("");
    const [lemonTitle, setLemonTitle] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            const response = await getData("negative");
            setEmotionList(response);
        };

        run();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const temp = {
            Journal: true,
            Relief: true,
            breathe: true,
            breatheTitle: breatheTitle,
            lemon: true,
            lemonTitle: lemonTitle,
            ytEmbeed: true,
        };

        const dbRef = doc(db, "negative", emotion);
        await setDoc(dbRef, temp);

        console.log("Data is uploaded");

        temp["id"] = emotion;
        setEmotionList([...emotionList, temp]);
        setEmotion("");

        setLoading(false);
    };

    const handleUpdate = (id, data) => {
        let temp = [...emotionList];

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                temp[i] = data;
                break;
            }
        }

        setEmotionList(temp);
    };

    const handleDelete = (id) => {
        let temp = [...emotionList];

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                temp.splice(i, 1);
                break;
            }
        }

        setEmotionList(temp);
    };

    return (
        <div className={styles.container}>
            <Index />

            <form onSubmit={handleSubmit}>
                <label>Emotion</label>
                <input
                    type="text"
                    onChange={(e) => setEmotion(e.target.value)}
                    value={emotion}
                />

                <label>Brethe Title</label>
                <input
                    type="text"
                    onChange={(e) => setBreatheTitle(e.target.value)}
                    value={breatheTitle}
                />

                <label>Lemon Title</label>
                <input
                    type="text"
                    onChange={(e) => setLemonTitle(e.target.value)}
                    value={lemonTitle}
                />

                <button type="submit" disabled={loading || !emotion.length}>
                    Add
                </button>
            </form>

            <div className={styles.cards}>
                {emotionList.map((emotion) => (
                    <NegativeCard
                        key={emotion.id}
                        emotion={emotion}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

const NegativeCard = ({ emotion, onUpdate, onDelete }) => {
    const [data, setData] = useState(emotion);

    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        const temp = { ...data };
        temp[key] = value;
        setData(temp);
    };

    const handleUpdate = async () => {
        setLoading(true);

        const temp = { ...data };
        delete temp["id"];

        const dbRef = doc(db, "negative", emotion.id);
        await updateDoc(dbRef, temp);

        onUpdate(emotion.id, data);

        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);

        const dbRef = doc(db, "negative", emotion.id);
        await deleteDoc(dbRef);

        onDelete(emotion.id);

        setLoading(false);
    };

    return (
        <>
            <div className={styles.card}>
                <p>{emotion.id}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Card</th>
                            <th>Show</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Journal</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={data.Journal}
                                    onChange={(e) =>
                                        handleChange(
                                            "Journal",
                                            e.target.checked
                                        )
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Relief</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={data.Relief}
                                    onChange={(e) =>
                                        handleChange("Relief", e.target.checked)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Breathe</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={data.breathe}
                                    onChange={(e) =>
                                        handleChange(
                                            "breathe",
                                            e.target.checked
                                        )
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Breathe Title</td>
                            <td>
                                <input
                                    type="text"
                                    value={data.breatheTitle}
                                    onChange={(e) =>
                                        handleChange(
                                            "breatheTitle",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Lemon</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={data.lemon}
                                    onChange={(e) =>
                                        handleChange("lemon", e.target.checked)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Lemon Title</td>
                            <td>
                                <input
                                    type="text"
                                    value={data.lemonTitle}
                                    onChange={(e) =>
                                        handleChange(
                                            "lemonTitle",
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>YT Embbed</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={data.ytEmbeed}
                                    onChange={(e) =>
                                        handleChange(
                                            "ytEmbeed",
                                            e.target.checked
                                        )
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={handleUpdate}
                                    disabled={loading}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Negative;
