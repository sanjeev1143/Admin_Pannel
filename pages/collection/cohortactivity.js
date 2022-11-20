import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";



function Cohortactivity() {

    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        cohortHead: "", cohortSpeakerImageUrl: "", cohortSubHead: "", cohortTitle: "", cohortUrl: "", cohortZoom: "", mainPara: "", profName: "", profTitle: "", sessionFees: "", topicCovers: "",
    })
    const dbRef = collection(db, "cohortActivity");
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
            cohortHead: "", cohortSpeakerImageUrl: "", cohortSubHead: "", cohortTitle: "", cohortUrl: "", cohortZoom: "", mainPara: "", profName: "", profTitle: "", sessionFees: "", topicCovers: "",
        })
    }
    async function Dlt(id) {
        const userDoc = doc(db, "cohortActivity", id);
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
            <Display save={save} clname='cohortActivity' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>cohortHead:{val.cohortHead}</h1>
                    <h1>cohortSpeakerImageUrl:{val.cohortSpeakerImageUrl}</h1>
                    <h1>cohortSubHead:{val.cohortSubHead}</h1>
                    <h1>cohortTitle:{val.cohortTitle}</h1>
                    <h1>cohortUrl:{val.cohortUrl}</h1>
                    <h1>cohortZoom:{val.cohortZoom}</h1>
                    <h1>mainPara:{val.mainPara}</h1>
                    <h1>profName:{val.profName}</h1>
                    <h1>profTitle:{val.profTitle}</h1>
                    <h1>sessionFees:{val.sessionFees}</h1>
                    <h1>topicCovers:{val.topicCovers}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>
                </div>
            ))}
            <form>
                <label>cohortHead</label>
                <input type="text" name="cohortHead" onChange={changed} value={info.cohortHead} />
                <label>cohortSpeakerImageUrl</label>
                <input type="text" name="cohortSpeakerImageUrl" onChange={changed} value={info.cohortSpeakerImageUrl} />
                <label>cohortSubHead</label>
                <input type="text" name="cohortSubHead" onChange={changed} value={info.cohortSubHead} />
                <label>cohortTitle</label>
                <input type="text" name="cohortTitle" onChange={changed} value={info.cohortTitle} />
                <label>cohortUrl</label>
                <input type="text" name="cohortUrl" onChange={changed} value={info.cohortUrl} />
                <label>cohortZoom</label>
                <input type="text" name="cohortZoom" onChange={changed} value={info.cohortZoom} />
                <label>mainPara</label>
                <input type="text" name="mainPara" onChange={changed} value={info.mainPara} />
                <label>profName</label>
                <input type="text" name="profName" onChange={changed} value={info.profName} />
                <label>profTitle</label>
                <input type="text" name="profTitle" onChange={changed} value={info.profTitle} />
                <label>sessionFees</label>
                <input type="text" name="sessionFees" onChange={changed} value={info.sessionFees} />
                <label>topicCovers</label>
                <input type="text" name="topicCovers" onChange={changed} value={info.topicCovers} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Cohortactivity
