import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";




function Feedcommentcollection() {
    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        comment: "", feedID: "", time: "", uid: "", usernameList: "",
    })
    const dbRef = collection(db, "feedCommentCollection");
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
            comment: "", feedID: "", time: "", uid: "", usernameList: "",
        })
    }
    async function Dlt(id) {
        const userDoc = doc(db, "feedCommentCollection", id);
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
            <Display save={save} clname='feedCommentCollection' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>comment:{val.comment}</h1>
                    <h1>feedID:{val.feedID}</h1>
                    <h1>time:{val.time}</h1>
                    <h1>uid:{val.uid}</h1>
                    <h1>usernameList:{val.usernameList}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                    <hr />
                </div>
            ))}

            <form>
                <label>comment</label>
                <input type="text" name="comment" onChange={changed} value={info.comment} />
                <label>feedID</label>
                <input type="text" name="feedID" onChange={changed} value={info.feedID} />
                <label>time</label>
                <input type="text" name="time" onChange={changed} value={info.time} />
                <label>uid</label>
                <input type="text" name="uid" onChange={changed} value={info.uid} />
                <label>usernameList</label>
                <input type="text" name="usernameList" onChange={changed} value={info.usernameList} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Feedcommentcollection
