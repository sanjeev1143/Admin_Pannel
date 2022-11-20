import { useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
updateDoc


function Phonelogindetails() {

    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
        dob: "", email: "", name: "", phone: "", usernameList: "",
    })
    const dbRef = collection(db, "phoneLoginDetails");
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
            dob: "", email: "", name: "", phone: "", usernameList: "",
        })
    }
    async function Dlt(id) {
        const userDoc = doc(db, "phoneLoginDetails", id);
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
            <Display save={save} clname='phoneLoginDetails' />
            {data.map((val, ind) => (
                <div key={ind}>
                    <h1>dob:{val.dob}</h1>
                    <h1>email:{val.email}</h1>
                    <h1>name:{val.name}</h1>
                    <h1>phone:{val.phone}</h1>
                    <h1>usernameList:{val.usernameList}</h1>
                    <button onClick={() => Dlt(val.id)}>Delete</button>
                    <button onClick={update}>Update</button>

                </div>
            ))}

            <form>
                <label>dob</label>
                <input type="text" name="dob" onChange={changed} value={info.dob} />
                <label>email</label>
                <input type="text" name="email" onChange={changed} value={info.email} />
                <label>name</label>
                <input type="text" name="name" onChange={changed} value={info.name} />
                <label>phone</label>
                <input type="text" name="phone" onChange={changed} value={info.phone} />
                <label>usernameList</label>
                <input type="text" name="usernameList" onChange={changed} value={info.usernameList} />
                <button onClick={saveDt}>Save</button>
            </form>
        </div>
    )
}

export default Phonelogindetails
