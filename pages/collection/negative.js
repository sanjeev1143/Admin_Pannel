import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
function Negative() {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        description: "", title: "",
    })
    const dbRef = collection(db, "negative");
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
            description: "", title: "",
        })
    }
    async function Dlt(id) {
        const userDoc = doc(db, "negative", id);
        await deleteDoc(userDoc);
        setData(data);
    }
    async function update(id) {
        const userDoc = doc(db, "negative", "Anger")
        await updateDoc(userDoc, change)
    }
    return (
        <div>
            <Index />
            <Display save={save} clname='negative' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>Journal:{val.Journal}</h1>
                    <h1>Relief:{val.Relief}</h1>
                    <h1>breathe:{val.breathe}</h1>
                    <h1>breatheTitle:{val.breatheTitle}</h1>
                    <h1>extraCard:{val.extraCard}</h1>
                    <h1>extraCard2:{val.extraCard2}</h1>
                    <h1>extraCard2Title:{val.extraCard2Title}</h1>
                    <h1>extraCard3:{val.extraCard3}</h1>
                    <h1>extraCard3Title:{val.extraCard3Title}</h1>
                    <h1>extraCardTitle:{val.extraCardTitle}</h1>
                    <h1>lemon:{val.lemon}</h1>
                    <h1>lemonTitle:{val.lemonTitle}</h1>
                    <h1>ytEmbeed:{val.ytEmbeed}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}

            <form>
                <label>description</label>
                <input type="text" name="description" onChange={changed} value={info.description} />
                <label>title</label>
                <input type="text" name="title" onChange={changed} value={info.title} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Negative


