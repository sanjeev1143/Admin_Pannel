import { useState, useEffect } from "react";
import Index from ".";
import { db } from "../api/config";
import { deleteDoc, doc } from "firebase/firestore";
import { getData } from "../../api";
import styles from "../../styles/Feeds.module.css";

const Feeddatacollection = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            const response = await getData("feedDataCollection");
            setFeeds(response);
        };

        run();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);

        const feedDoc = doc(db, "feedDataCollection", id);
        await deleteDoc(feedDoc);

        const temp = [...feeds];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                temp.splice(i, 1);
                break;
            }
        }
        setFeeds(temp);

        setLoading(false);
    };

    return (
        <div className={styles.main}>
            <Index />

            <table>
                <thead>
                    <tr>
                        <th>Feed ID</th>
                        <th>User ID</th>
                        <th>Feed</th>
                        <th>Time</th>
                        <th>Username List</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {feeds.map((feed) => (
                        <tr key={feed.id}>
                            <td>{feed.feedID}</td>
                            <td>{feed.uid}</td>
                            <td>{feed.feedBoxList}</td>
                            <td>{new Date(feed.time).toLocaleString()}</td>
                            <td>{feed.usernameList}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(feed.id)}
                                    disabled={loading}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Feeddatacollection;
