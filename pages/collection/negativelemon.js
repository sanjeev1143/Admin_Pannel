import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";


function NegativeLemon() {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        bullet1: "", bullet2: "", bullet3: "", bullet4: "", bullet5: "", output: "", title: ""
    })
    const dbRef = collection(db, "negative_lemon");
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
        const userDoc = doc(db, "negative_lemon", id);
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
            <Display save={save} clname='negative_lemon' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>bullet1:{val.bullet1}</h1>
                    <h1>bullet2:{val.bullet2}</h1>
                    <h1>bullet3:{val.createdTime2}</h1>
                    <h1>bullet4:{val.bullet4}</h1>
                    <h1>bullet5:{val.bullet5}</h1>
                    <h1>output:{val.output}</h1>
                    <h1>title:{val.title}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}
            <form>
                <label>bullet1</label>
                <input type="text" name="bullet1" onChange={changed} value={info.bullet1} />
                <label>bullet2</label>
                <input type="text" name="bullet2" onChange={changed} value={info.bullet2} />
                <label>bullet3</label>
                <input type="text" name="bullet3" onChange={changed} value={info.bullet3} />
                <label>bullet4</label>
                <input type="text" name="bullet4" onChange={changed} value={info.bullet4} />
                <label>bullet5</label>
                <input type="text" name="bullet5" onChange={changed} value={info.bullet5} />

                <label>output</label>
                <input type="text" name="para" onChange={changed} value={info.para} />
                <label>title</label>
                <input type="text" name="title" onChange={changed} value={info.title} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default NegativeLemon
