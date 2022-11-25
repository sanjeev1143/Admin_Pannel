import { useEffect, useInsertionEffect, useState } from "react"
import Index from "."
import { db } from "../api/config";
import Display from "../../Display"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Negativebreathe from "./negativebreathe";
import NegativeLemon from "./negativelemon";

function Negativee(props) {
    const [data, setData] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [info, setInfo] = useState({

    })
    const dbRef = collection(db, "negative");
    const [show, setshow] = useState(false);
    function changed(e) {
        setInfo((prv) => ({
            ...prv, [e.target.name]: e.target.value
        }))
        console.log(info);
    }
    async function saveDt(e) {
        e.preventDefault();
        setIsUpdate(false);
        const userDoc = doc(db, "negative", props.id)
        await updateDoc(userDoc, info)
        setInfo({})
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

    // async function Dlt(id) {
    //     const userDoc = doc(db, "negative", id);
    //     await deleteDoc(userDoc);
    //     setData(data);
    // }
    async function update(id) {
        setInfo(data[0])
        setIsUpdate(true);
    }
    return (
        <div>

            {
                (data.map((val, ind) => (
                    isUpdate ? <form>
                        <label>Journal</label>
                        <input type="text" name="Journal" onChange={changed} value={info.Journal} />
                        <label>Relief</label>
                        <input type="text" name="Relief" onChange={changed} value={info.Relief} />
                        <label>breathe</label>
                        <input type="text" name="breathe" onChange={changed} value={info.breathe} />
                        <label>breatheTitle</label>
                        <input type="text" name="breatheTitle" onChange={changed} value={info.breatheTitle} />
                        <label>extraCard</label>
                        <input type="text" name="extraCard" onChange={changed} value={info.extraCard} />
                        <label>extraCard2</label>
                        <input type="text" name="extraCard2" onChange={changed} value={info.extraCard2} />
                        <label>extraCard2Title</label>
                        <input type="text" name="extraCard2Title" onChange={changed} value={info.extraCard2Title} />
                        <label>extraCard3</label>
                        <input type="text" name="extraCard3" onChange={changed} value={info.extraCard3} />
                        <label>extraCard3Title</label>
                        <input type="text" name="extraCard3Title" onChange={changed} value={info.extraCard3Title} />
                        <label>extraCardTitle</label>
                        <input type="text" name="extraCardTitle" onChange={changed} value={info.extraCardTitle} />
                        <label>lemon</label>
                        <input type="text" name="lemon" onChange={changed} value={info.lemon} />
                        <label>lemonTitle</label>
                        <input type="text" name="lemonTitle" onChange={changed} value={info.lemonTitle} />
                        <label>ytEmbeed</label>
                        <input type="text" name="ytEmbeed" onChange={changed} value={info.ytEmbeed} />
                        <button onClick={saveDt}>Save</button>

                    </form> :
                        <div key={ind}>
                            <h1>Journal:{String(val.Journal)}</h1>
                            <h1>Relief:{String(val.Relief)}</h1>
                            <h1>breathe:{String(val.breathe)}</h1>
                            <h1>breatheTitle:{String(val.breatheTitle)}</h1>
                            <h1>extraCard:{String(val.extraCard)}</h1>
                            <h1>extraCard2:{String(val.extraCard2)}</h1>
                            <h1>extraCard2Title:{String(val.extraCard2Title)}</h1>
                            <h1>extraCard3:{String(val.extraCard3)}</h1>
                            <h1>extraCard3Title:{String(val.extraCard3Title)}</h1>
                            <h1>extraCardTitle:{String(val.extraCardTitle)}</h1>
                            <h1>lemon:{String(val.lemon)}</h1>
                            <h1>lemonTitle:{String(val.lemonTitle)}</h1>
                            <h1>ytEmbeed:{String(val.ytEmbeed)}</h1>
                            <button onClick={update}>Update</button>
                            {val.breathe == "true" ? <Negativebreathe /> : null}
                            {val.lemon == "true" ? <NegativeLemon /> : null}
                        </div>
                ))
                )
            }

        </div>
    )
}

export default Negativee


