import { db } from "./pages/api/config";
import { collection, getDocs } from "firebase/firestore";

export const getEmojis = async () => {
    const cRef = collection(db, "emoji");

    try {
        const data = await getDocs(cRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (e) {
        console.log(e);
    }
};

export const getCohortActivity = async () => {
    const cRef = collection(db, "cohortActivity");

    try {
        const data = await getDocs(cRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (e) {
        console.log(e);
    }
};

export const getNegative = async () => {
    const cRef = collection(db, "negative");

    try {
        const data = await getDocs(cRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (e) {
        console.log(e);
    }
};

export const getCohortFeedback = async () => {
    const cRef = collection(db, "CohortStoreFeedbacks");

    try {
        const data = await getDocs(cRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (e) {
        console.log(e);
    }
};
