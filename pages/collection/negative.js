import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../Display"
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
        // const userDoc = doc(Db, "Notes", props.id)
        // await updateDoc(userDoc, change)
    }
    return (
        <div>
            <Index />
            <Display save={save} clname='negative' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>description:{val.description}</h1>
                    <h1>title:{val.title}</h1>
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
