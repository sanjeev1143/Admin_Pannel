import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";



function Ytlink() {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState({
        link: "",
        title: ""
    })
    const [change, setChange] = useState({
        link: "",
        title: ""
    });
    const [IsUpdate, SetIsUpdate] = useState({ look: true, id: "" });
    const dbRef = collection(db, "ytLink");
    function save(val) {
        setData(val)
    }
    function changed(e) {
        setInfo((prv) => ({
            ...prv, [e.target.name]: e.target.value
        }))

    }

    async function saveDt(e) {
        e.preventDefault();
        const data = await addDoc(dbRef, info)
        setInfo({
            link: "",
            title: ""
        })
    }
    async function Dlt(id) {
        const userDoc = doc(db, "ytLink", id);
        await deleteDoc(userDoc);
        setData(data);
    }
    async function update(id) {
        const userDoc = doc(db, "ytLink", id)
        await updateDoc(userDoc, change)

    }



    return (
        <div>
            <Index />
            <Display save={save} clname='ytLink' />
            <div className="get">
                {data.map((val, ind) => (
                    <div key={ind}>
                        <h1>link:{val.link}</h1>
                        <h1>title:{val.title}</h1>
                        <button onClick={() => Dlt(val.id)}>Delete</button>
                        <button onClick={() => SetIsUpdate({ look: false, id: val.id })}>Update</button>

                    </div>
                ))}
            </div>
            <form>
                <label>link</label>
                <input type="text" name="link" onChange={changed} value={info.link} />
                <label>title</label>
                <input type="text" name="title" onChange={changed} value={info.title} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Ytlink
