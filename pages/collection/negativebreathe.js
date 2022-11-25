import { useEffect, useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";


function Negativebreathe() {
    const [data, setData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [show, setshow] = useState(false);

    const [info, setInfo] = useState({
        bullet1: "", bullet2: "", bullet3: "", bullet4: "", bullet5: "", output: "", para: "", title: ""
    })


    const dbRef = collection(db, "negative_breathe");



    function changed(e) {
        setInfo((prv) => ({
            ...prv, [e.target.name]: e.target.value
        }))
        console.log(info);
    }
    async function saveDt(e) {
        e.preventDefault();
        setIsUpdate(false);
        const userDoc = doc(db, "negative_breathe", "Anger")
        await updateDoc(userDoc, info)
        setInfo({
            bullet1: "", bullet2: "", bullet3: "", bullet4: "", bullet5: "", output: "", para: "", title: ""
        })
    }

    useEffect(() => {

        const getData = async () => {
            try {
                const data = await getDocs(dbRef);
                setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    })


    async function update(id) {
        setInfo(data[0])
        setIsUpdate(true);
    }
    console.log(info);
    return (
        <div>
            <button onClick={() => { setshow(true) }}>show</button>
            {show ?
                (data.map((val, ind) => (
                    isUpdate ? <form>
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
                        <input type="text" name="output" onChange={changed} value={info.output} />
                        <label>para</label>
                        <input type="text" name="para" onChange={changed} value={info.para} />
                        <label>title</label>
                        <input type="text" name="title" onChange={changed} value={info.title} />
                        <button onClick={saveDt}>Save</button>
                    </form> :
                        <div key={ind}>
                            <div key={ind}>
                                <h1>bullet1:{val.bullet1}</h1>
                                <h1>bullet2:{val.bullet2}</h1>
                                <h1>bullet3:{val.bullet3}</h1>
                                <h1>bullet4:{val.bullet4}</h1>
                                <h1>bullet5:{val.bullet5}</h1>
                                <h1>output:{val.output}</h1>
                                <h1>para:{val.para}</h1>
                                <h1>title:{val.title}</h1>
                                <button onClick={() => Dlt(val.id)}>Delete</button>
                                <button onClick={update}>Update</button>

                            </div>
                        </div>
                ))
                ) : null
            }
        </div>
    )
}

export default Negativebreathe
