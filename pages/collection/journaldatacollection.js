import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";


function Journaldatacollection() {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        createdTime: "", createdTime2: "", description: "", title: "", userID: "",
    })
    const dbRef = collection(db, "journalDataCollection");
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
            createdTime: "", createdTime2: "", description: "", title: "", userID: "",
        })
    }
    async function Dlt(id) {
        const userDoc = doc(db, "journalDataCollection", id);
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
            <Display save={save} clname='journalDataCollection' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>createdTime:{val.createdTime}</h1>
                    <h1>createdTime2:{val.createdTime2}</h1>
                    <h1>description:{val.description}</h1>
                    <h1>title:{val.title}</h1>
                    <h1>userID:{val.userID}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}
            <form>
                <label>createdTime</label>
                <input type="text" name="createdTime" onChange={changed} value={info.createdTime} />
                <label>createdTime2</label>
                <input type="text" name="createdTime2" onChange={changed} value={info.createdTime2} />
                <label>description</label>
                <input type="text" name="description" onChange={changed} value={info.description} />
                <label>title</label>
                <input type="text" name="title" onChange={changed} value={info.title} />
                <label>userID</label>
                <input type="text" name="userID" onChange={changed} value={info.userID} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Journaldatacollection
