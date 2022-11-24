import { db } from "./pages/api/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";


function Display(props) {
    const [read, setRead] = useState([]);
    const cRef = collection(db, props.clname);
    useEffect(() => {

        const getData = async () => {
            try {
                const data = await getDocs(cRef);
                setRead(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [])

    return (
        <div >
            <button onClick={() => props.save(read)}>Get Data</button>
        </div>
    )
}

export default Display
