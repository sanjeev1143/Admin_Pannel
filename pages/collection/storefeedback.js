import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";



function Storefeedback() {

    const [data, setData] = useState([]);
    const [info, setInfo] = useState({
        otherSuggestion: "", selectedSuggestions: "", stars: "",
    })
    const dbRef = collection(db, "storeFeedback");
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
            otherSuggestion: "", selectedSuggestions: "", stars: "",
        })
    }
    async function Dlt(id) {
        const userDoc = doc(db, "storeFeedback", id);
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
            <Display save={save} clname='storeFeedback' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>otherSuggestion:{val.otherSuggestion}</h1>
                    <h1>selectedSuggestions:{val.selectedSuggestions}</h1>
                    <h1>stars:{val.stars}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}

            <form>
                <label>otherSuggestion</label>
                <input type="text" name="otherSuggestion" onChange={changed} value={info.otherSuggestion} />
                <label>selectedSuggestions</label>
                <input type="text" name="selectedSuggestions" onChange={changed} value={info.selectedSuggestions} />
                <label>stars</label>
                <input type="text" name="stars" onChange={changed} value={info.stars} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Storefeedback
