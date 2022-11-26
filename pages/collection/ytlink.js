import { useState, useEffect } from "react";
import Index from ".";
import { db } from "../api/config";
import { doc, updateDoc } from "firebase/firestore";
import styles from "../../styles/YTLink.module.css";
import { getData } from "../../api";

const Ytlink = () => {
    const [data, setData] = useState({ link: "", title: "", id: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            setLoading(true);

            const response = await getData("ytLink");
            setData(response[0]);

            setLoading(false);
        };

        run();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setLoading(true);

        const temp = { ...data };
        delete temp["id"];

        const userDoc = doc(db, "ytLink", data.id);
        await updateDoc(userDoc, temp);

        setLoading(false);
    };

    return (
        <div className={styles.main}>
            <Index />

            <form onSubmit={handleUpdate}>
                <label>Title</label>
                <input
                    type="text"
                    onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                    }
                    value={data.title}
                    disabled={loading}
                />

                <label>Link</label>
                <input
                    type="text"
                    onChange={(e) => setData({ ...data, link: e.target.value })}
                    value={data.link}
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default Ytlink;
