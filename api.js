import { db } from "./pages/api/config";
import { collection, getDocs } from "firebase/firestore";

export const getData = async (collectionName) => {
    const cRef = collection(db, collectionName);

    try {
        const data = await getDocs(cRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (e) {
        console.log(e);
    }
};
