import { useEffect, useState } from "react";
import Index from ".";
import { db } from "../api/config";
import { deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import styles from "../../styles/NegativeBL.module.css";
import { getData } from "../../api";

const NegativeLemon = () => {
    const [formData, setFormData] = useState({
        emotion: "",
        title: "",
        bullet1: "",
        bullet2: "",
        bullet3: "",
        bullet4: "",
        bullet5: "",
        output: "",
    });

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            const response = await getData("negative_lemon");
            setData(response);
        };

        run();
    }, []);

    const handleChange = (key, value) => {
        const temp = { ...formData };
        temp[key] = value;
        setFormData(temp);
    };

    const handleDelete = (id) => {
        let temp = [...data];

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                temp.splice(i, 1);
                break;
            }
        }

        setData(temp);
    };

    const handleUpdate = (id, newData) => {
        let temp = [...data];

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                temp[i] = newData;
                break;
            }
        }

        setData(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const temp = { ...formData };
        delete temp["emotion"];

        const dbRef = doc(db, "negative_lemon", formData.emotion);
        await setDoc(dbRef, temp);

        temp["id"] = formData.emotion;
        setData([...data, temp]);

        resetFormData();

        setLoading(false);
    };

    const resetFormData = () => {
        setFormData({
            emotion: "",
            title: "",
            bullet1: "",
            bullet2: "",
            bullet3: "",
            bullet4: "",
            bullet5: "",
            output: "",
        });
    };

    return (
        <div className={styles.main}>
            <Index />

            <form onSubmit={handleSubmit}>
                <label>Emotion</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("emotion", e.target.value)}
                    value={formData.emotion}
                />

                <label>Title</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("title", e.target.value)}
                    value={formData.title}
                />

                <label>Bullet 1</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("bullet1", e.target.value)}
                    value={formData.bullet1}
                />

                <label>Bullet 2</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("bullet2", e.target.value)}
                    value={formData.bullet2}
                />

                <label>Bullet 3</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("bullet3", e.target.value)}
                    value={formData.bullet3}
                />

                <label>Bullet 4</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("bullet4", e.target.value)}
                    value={formData.bullet4}
                />

                <label>Bullet 5</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("bullet5", e.target.value)}
                    value={formData.bullet5}
                />

                <label>Output</label>
                <input
                    type="text"
                    onChange={(e) => handleChange("output", e.target.value)}
                    value={formData.output}
                />

                <button
                    type="submit"
                    disabled={loading || !formData.emotion.length}
                >
                    Add
                </button>
            </form>

            <div className={styles.cards}>
                {data.map((emotion) => (
                    <NegativelemonCard
                        key={emotion.id}
                        data={emotion}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default NegativeLemon;

const NegativelemonCard = ({ data, onUpdate, onDelete }) => {
    const [formData, setFormData] = useState({
        title: "",
        bullet1: "",
        bullet2: "",
        bullet3: "",
        bullet4: "",
        bullet5: "",
        output: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const temp = { ...data };
        delete temp["id"];
        setFormData(temp);
    }, [data]);

    const handleChange = (key, value) => {
        const temp = { ...formData };
        temp[key] = value;
        setFormData(temp);
    };

    const handleUpdate = async () => {
        setLoading(true);

        const dbRef = doc(db, "negative_lemon", data.id);
        await updateDoc(dbRef, formData);

        onUpdate(data.id, { ...formData, id: data.id });

        setLoading(false);
    };

    const handleDelete = async () => {
        setLoading(true);

        const dbRef = doc(db, "negative_lemon", data.id);
        await deleteDoc(dbRef);

        onDelete(data.id);

        setLoading(false);
    };

    return (
        <>
            <div className={styles.card}>
                <p>{data.id}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handleChange("title", e.target.value)
                                    }
                                    value={formData.title}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Bullet 1</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handleChange("bullet1", e.target.value)
                                    }
                                    value={formData.bullet1}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Bulet 2</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handleChange("bullet2", e.target.value)
                                    }
                                    value={formData.bullet2}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Bullet 3</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handleChange("bullet3", e.target.value)
                                    }
                                    value={formData.bullet3}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Bullet 4</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handleChange("bullet4", e.target.value)
                                    }
                                    value={formData.bullet4}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Bullet 5</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handleChange("bullet5", e.target.value)
                                    }
                                    value={formData.bullet5}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Output</td>
                            <td>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handleChange("output", e.target.value)
                                    }
                                    value={formData.output}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Update</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={handleUpdate}
                                    disabled={loading}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Delete</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};
