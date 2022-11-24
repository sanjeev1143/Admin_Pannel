import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";



function CohortStoreFeedback() {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        Instructor_Rate: "", Thumb: "", Topic_Rate: "", otherSuggestion: "",
    })
    const dbRef = collection(db, "CohortStoreFeedback");
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
            Instructor_Rate: "", Thumb: "", Topic_Rate: "", otherSuggestion: "",
        })
    }
    // async function Dlt(id) {
    //     const userDoc = doc(db, "CohortStoreFeedback", id);
    //     await deleteDoc(userDoc);
    //     setData(data);
    // }
    // async function update(id) {
    //     // const userDoc = doc(Db, "Notes", props.id)
    //     // await updateDoc(userDoc, change)
    // }
    return (
        <div>
            <Index />
            <Display save={save} clname='CohortStoreFeedback' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>Instructor Rate:{val["Instructor Rate"]}</h1>
                    <h1>Thumb:{val.Thumb}</h1>
                    <h1>Topic Rate:{val["Topic Rate"]}</h1>
                    <h1>otherSuggestion:{val.otherSuggestion}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}

            <form>
                <label>Instructor Rate</label>
                <input type="text" name="Instructor_Rate" onChange={changed} value={info.Instructor_Rate} />
                <label>Thumb</label>
                <input type="text" name="Thumb" onChange={changed} value={info.Thumb} />
                <label>Topic Rate</label>
                <input type="text" name="Topic_Rate" onChange={changed} value={info.Topic_Rate} />
                <label>otherSuggestion</label>
                <input type="text" name="otherSuggestion" onChange={changed} value={info.otherSuggestion} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default CohortStoreFeedback
