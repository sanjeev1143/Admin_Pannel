import { useEffect, useState } from "react";
import Index from ".";
import { db } from "../api/config";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import styles from "../../styles/Emoji.module.css";
import { getData } from "../../api";

function Emoji() {
    const [loading, setLoading] = useState(false);

    const [emojis, setEmojis] = useState([
        { emotion: "Happy", id: null },
        { emotion: "Sad", id: null },
        { emotion: "Anger", id: null },
        { emotion: "Love", id: null },
        { emotion: "Rage", id: null },
        { emotion: "Surprise", id: null },
        { emotion: "Grief", id: null },
        { emotion: "Gloomy", id: null },
        { emotion: "Anxiety", id: null },
        { emotion: "Annoyance", id: null },
        { emotion: "Upset", id: null },
        { emotion: "Trauma", id: null },
        { emotion: "Shock", id: null },
        { emotion: "Excited", id: null },
        { emotion: "Optimistic", id: null },
        { emotion: "Confident", id: null },
        { emotion: "Irritation", id: null },
        { emotion: "Jealousy", id: null },
        { emotion: "Fear", id: null },
        { emotion: "Uncertain", id: null },
        { emotion: "Hopeful", id: null },
        { emotion: "Panic", id: null },
        { emotion: "Paranoid", id: null },
        { emotion: "Regret", id: null },
        { emotion: "Possessive", id: null },
        { emotion: "Guilt", id: null },
        { emotion: "Terror", id: null },
        { emotion: "Motivated", id: null },
    ]);

    useEffect(() => {
        const run = async () => {
            setLoading(true);

            const response = await getData("emoji");
            const temp = [...emojis];

            for (let i = 0; i < response.length; i++) {
                for (let j = 0; j < temp.length; j++) {
                    if (response[i].emotion == temp[j].emotion) {
                        temp[j].id = response[i].id;
                        break;
                    }
                }
            }

            setEmojis(temp);

            setLoading(false);
        };

        run();
    }, []);

    const update = async (val) => {
        setLoading(true);

        if (!!val.id) {
            const userDoc = doc(db, "emoji", val.id);
            await deleteDoc(userDoc);

            const temp = [...emojis];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].emotion === val.emotion) {
                    temp[i].id = null;
                    break;
                }
            }
            setEmojis(temp);
        } else {
            const dbRef = collection(db, "emoji");
            const data = await addDoc(dbRef, { emotion: val.emotion });

            const temp = [...emojis];
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].emotion === val.emotion) {
                    temp[i].id = data.id;
                    break;
                }
            }
            setEmojis(temp);
        }

        setLoading(false);
    };

    return (
        <div className={styles.main}>
            <Index />

            <table>
                <thead>
                    <tr>
                        <th>Emotion</th>
                        <th>Show</th>
                    </tr>
                </thead>
                <tbody>
                    {emojis.map((val, i) => (
                        <tr key={i}>
                            <td>{val.emotion}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={!!val.id}
                                    disabled={loading}
                                    onChange={() => update(val)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Emoji;
