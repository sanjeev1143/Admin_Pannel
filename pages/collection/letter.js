import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";


function Letter() {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        letter: ""
    })
    const dbRef = collection(db, "letter");
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
            letter: ""
        })
    }

    async function Dlt(id) {
        const userDoc = doc(db, "letter", id);
        await deleteDoc(userDoc);
        setData(data);
    }
    async function update(id) {
        // const userDoc = doc(Db, "Notes", props.id)
        // await updateDoc(userDoc, change)
    }

    console.log(data);
    return (
        <div>
            <Index />
            <Display save={save} clname='letter' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>letter:{val.letter}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}

            <form>
                <label>letter</label>
                <input type="text" name="letter" onChange={changed} value={info.letter} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Letter
