import { useState, useEffect } from "react";
import Index from ".";
import { db } from "../api/config";
import { deleteDoc, doc } from "firebase/firestore";
import { getData } from "../../api";
import styles from "../../styles/FeedComments.module.css";

const Feedcommentcollection = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            const response = await getData("feedCommentCollection");
            setComments(response);
        };

        run();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);

        const userDoc = doc(db, "feedCommentCollection", id);
        await deleteDoc(userDoc);

        const temp = [...comments];
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                temp.splice(i, 1);
                break;
            }
        }
        setComments(temp);

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
                        <th>Comment</th>
                        <th>Time</th>
                        <th>Username List</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {comments.map((comment) => (
                        <tr key={comment.id}>
                            <td>{comment.feedID}</td>
                            <td>{comment.uid}</td>
                            <td>{comment.comment}</td>
                            <td>{new Date(comment.time).toLocaleString()}</td>
                            <td>{comment.usernameList}</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(comment.id)}
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

export default Feedcommentcollection;
