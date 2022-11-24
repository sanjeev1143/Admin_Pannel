import { useEffect, useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import styles from "../../styles/Emoji.module.css";
import { getEmojis } from "../../api"



function Emoji() {
    const emojis = ["Happy",
        "Sad",
        "Anger",
        "Love",
        "Rage",
        "Surprise",
        "Grief",
        "Gloomy",
        "Anxiety",
        "Annoyance",
        "Upset",
        "Trauma",
        "Shock",
        "Excited",
        "Optimistic",
        "Confident",
        "Irritation",
        "Jealousy",
        "Fear",
        "Uncertain",
        "Hopeful",
        "Panic",
        "Paranoid",
        "Regret",
        "Possessive",
        "Guilt",
        "Terror",
        "Motivated",
    ]

    const [emojisInDB, setEmojisInDB] = useState([])

    useEffect(() => {
        const run = async () => {
            const response = await getEmojis();
            setEmojisInDB(response.map(res => res.emotion))
            setData(response);
            console.log(response)
        }

        run();
    }, [])

    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        emotion: ""
    })
    const dbRef = collection(db, "emoji");
    function save(val) {
        setData(val)
    }



    async function update(e) {
        const res = emojisInDB.includes(e.target.value)
        const id = data.filter((val) => e.target.name === val.emotion)
        const key = (id[0].id);
        console.log(res)


        if (res) {
            console.log("comming");
            const userDoc = doc(db, "emoji", key);
            await deleteDoc(userDoc);
            const temp = emojisInDB.splice(emojisInDB.indexOf(e.target.name), 1)
            setEmojisInDB(temp);
        } else {
            const data = await addDoc(dbRef, { emotion: e.target.name })
            setEmojisInDB([...emojisInDB, e.target.name])
        }
        console.log(e.target.value);
    }
    return (
        <div className={styles.main}>
            <Index />
            <Display save={save} clname='emoji' />

            <table>
                <tr>
                    <th>Emotion</th>
                    <th>Show</th>
                </tr>
                {emojis.map((name, i) => (
                    <tr key={i}>
                        <td>{name}</td>
                        <td>
                            <input type="checkbox" checked={emojisInDB.includes(name)} name={name} onChange={update} />
                        </td>
                    </tr>
                ))}
            </table>


        </div>
    )
}

export default Emoji
