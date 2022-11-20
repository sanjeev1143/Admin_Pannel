import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";


function Emoji() {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        emotion: ""
    })
    const dbRef = collection(db, "emoji");
    function save(val) {
        setData(val)
    }
    function changed(e) {
        setInfo((prv) => ({
            ...prv, [e.target.name]: e.target.value
        }))
        console.log(info);
    }
    async function saveDt(e) {
        e.preventDefault();
        const data = await addDoc(dbRef, info)
        setInfo({
            emotion: ""
        })
    }

    async function Dlt(id) {
        const userDoc = doc(db, "emoji", id);
        await deleteDoc(userDoc);
        setData(data);
    }
    async function update(id) {
        // const userDoc = doc(Db, "Notes", props.id)
        // await updateDoc(userDoc, change)
    }
    return (
        <div>
            <Index />
            <Display save={save} clname='emoji' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>emotion:{val.emotion}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}

            <form>
                <label>emotion</label>
                <input type="text" name="emotion" onChange={changed} value={info.emotion} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Emoji
