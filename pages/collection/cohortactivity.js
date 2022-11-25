import { useState, useEffect } from "react";
import Index from ".";
import { db } from "../api/config";
import { storage } from "../api/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "../../styles/Cohort.module.css";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { getCohortActivity } from "../../api";

function Cohortactivity() {
    const [cohortAs, setCohortAs] = useState([]);
    const [speakerImage, setSpeakerImage] = useState();
    const [headerImage, setHeaderImage] = useState();
    const [loading, setLoading] = useState(false);

    const [info, setInfo] = useState({
        cohortHead: "",
        cohortSpeakerImageUrl: "",
        cohortSubHead: "",
        cohortTitle: "",
        cohortUrl: "",
        cohortZoom: "",
        mainPara: "",
        profName: "",
        profTitle: "",
        sessionFees: "",
        topicCovers: "",
        cohortDate: "",
        cohortDateAndTime: "",
        feedbackStart: false,
    });

    useEffect(() => {
        const run = async () => {
            const response = await getCohortActivity();
            setCohortAs(response);
        };

        run();
    }, []);

    function changed(e) {
        setInfo((prv) => ({
            ...prv,
            [e.target.name]: e.target.value,
        }));
    }

    const handleDelete = (id) => {
        let temp = [...cohortAs];

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) temp.splice(i, 1);
        }

        setCohortAs(temp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await handleImages();

        let temp = info;
        temp.cohortSpeakerImageUrl = `cohortDetails/${info.cohortTitle}/speaker/UpDevelop.jpg`;
        temp.cohortUrl = `cohortDetails/${info.cohortTitle}/test/image046.jpg`;
        temp.feedbackStart = temp.feedbackStart == "true";

        const dbRef = collection(db, "cohortActivity");
        const data = await addDoc(dbRef, temp);

        console.log("Data is uploaded");

        temp["id"] = data.id;
        setCohortAs([...cohortAs, temp]);

        handleReset();

        setLoading(false);
    };

    const handleImages = async () => {
        if (headerImage && speakerImage) {
            await uploadBytes(
                ref(
                    storage,
                    `cohortDetails/${info.cohortTitle}/test/image046.jpg`
                ),
                headerImage
            );

            console.log("Header image uploaded");

            await uploadBytes(
                ref(
                    storage,
                    `cohortDetails/${info.cohortTitle}/speaker/UpDevelop.jpg`
                ),
                speakerImage
            );

            console.log("Speaker image uploaded");
        } else {
            console.log("Images required");
        }
    };

    const handleReset = () => {
        setHeaderImage("");
        setSpeakerImage("");
        setInfo({
            cohortHead: "",
            cohortSpeakerImageUrl: "",
            cohortSubHead: "",
            cohortTitle: "",
            cohortUrl: "",
            cohortZoom: "",
            mainPara: "",
            profName: "",
            profTitle: "",
            sessionFees: "",
            topicCovers: "",
            cohortDate: "",
            cohortDateAndTime: "",
            feedbackStart: false,
        });
    };

    return (
        <div className={styles.container}>
            <Index />

            <h2>Add New</h2>

            <form onSubmit={handleSubmit}>
                <label>Heading</label>
                <input
                    type="text"
                    name="cohortHead"
                    onChange={changed}
                    value={info.cohortHead}
                />

                <label>Speaker Image (Only JPEG)</label>
                <input
                    type="file"
                    name="cohortSpeakerImageUrl"
                    accept="image/jpeg"
                    onChange={(e) => setSpeakerImage(e.target.files[0])}
                />

                <label>Sub Heading</label>
                <input
                    type="text"
                    name="cohortSubHead"
                    onChange={changed}
                    value={info.cohortSubHead}
                />

                <label>Cohort Activty Title</label>
                <input
                    type="text"
                    name="cohortTitle"
                    onChange={changed}
                    value={info.cohortTitle}
                />

                <label>Header Image</label>
                <input
                    type="file"
                    name="cohortUrl"
                    accept="image/jpeg"
                    onChange={(e) => setHeaderImage(e.target.files[0])}
                />

                <label>Zoom link</label>
                <input
                    type="url"
                    name="cohortZoom"
                    onChange={changed}
                    value={info.cohortZoom}
                />

                <label>Description</label>
                <textarea
                    name="mainPara"
                    onChange={changed}
                    value={info.mainPara}
                ></textarea>

                <label>Professor Name</label>
                <input
                    type="text"
                    name="profName"
                    onChange={changed}
                    value={info.profName}
                />

                <label>Professor Designation</label>
                <input
                    type="text"
                    name="profTitle"
                    onChange={changed}
                    value={info.profTitle}
                />

                <label>Fees (Full)</label>
                <input
                    type="text"
                    name="sessionFees"
                    placeholder="Rs. 1000 / session"
                    onChange={changed}
                    value={info.sessionFees}
                />

                <label>Topics covered</label>
                <input
                    type="text"
                    name="topicCovers"
                    onChange={changed}
                    value={info.topicCovers}
                />

                <label>Cohort Date</label>
                <input
                    type="date"
                    name="cohortDate"
                    onChange={changed}
                    value={info.cohortDate}
                />

                <label>Cohort Date And Time</label>
                <input
                    type="datetime-local"
                    name="cohortDateAndTime"
                    onChange={changed}
                    value={info.cohortDateAndTime}
                />

                <label>Allow feedback</label>
                <select
                    name="feedbackStart"
                    onChange={changed}
                    value={info.feedbackStart}
                >
                    <option value={false}>Don&apos;t Allow</option>
                    <option value={true}>Allow</option>
                </select>

                <button type="submit" disabled={loading}>
                    Save
                </button>
            </form>

            <h2>Data</h2>
            <div className={styles.cards}>
                {cohortAs.map((activity) => (
                    <CohortCard
                        key={activity.id}
                        activity={activity}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

const CohortCard = ({ activity, onDelete }) => {
    const [speakerImage, setSpeakerImage] = useState("");
    const [headerImage, setHeaderImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const run = async () => {
            setSpeakerImage(await getImgSrc(activity.cohortSpeakerImageUrl));
            setHeaderImage(await getImgSrc(activity.cohortUrl));
        };

        run();
    }, []);

    const getImgSrc = async (partialURL) => {
        const url = await getDownloadURL(ref(storage, partialURL));
        return url;
    };

    const handleDelete = async () => {
        setLoading(false);
        const document = doc(db, "cohortActivity", activity.id);
        await deleteDoc(document);
        onDelete(activity.id);
        setLoading(true);
    };

    return (
        <>
            <div className={styles.card}>
                <table>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Heading</td>
                            <td>{activity.cohortHead}</td>
                        </tr>

                        <tr>
                            <td>Speaker Image</td>
                            <td>
                                <img
                                    src={speakerImage}
                                    alt={activity.cohortSpeakerImageUrl}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Sub Heading</td>
                            <td>{activity.cohortSubHead}</td>
                        </tr>

                        <tr>
                            <td>Cohort Activty Title</td>
                            <td>{activity.cohortTitle}</td>
                        </tr>

                        <tr>
                            <td>Header Image</td>
                            <td>
                                <img
                                    src={headerImage}
                                    alt={activity.cohortUrl}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Zoom link</td>
                            <td>{activity.cohortZoom}</td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>{activity.mainPara}</td>
                        </tr>

                        <tr>
                            <td>Professor Name</td>
                            <td>{activity.profName}</td>
                        </tr>

                        <tr>
                            <td>Professor Designation</td>
                            <td>{activity.profTitle}</td>
                        </tr>

                        <tr>
                            <td>Fees</td>
                            <td>{activity.sessionFees}</td>
                        </tr>

                        <tr>
                            <td>Topics covered</td>
                            <td>{activity.topicCovers}</td>
                        </tr>

                        <tr>
                            <td>Cohort Date</td>
                            <td>{activity.cohortDate}</td>
                        </tr>

                        <tr>
                            <td>Cohort Date And Time</td>
                            <td>{activity.cohortDateAndTime}</td>
                        </tr>

                        <tr>
                            <td>Allow feedback</td>
                            <td>{activity.feedbackStart + ""}</td>
                        </tr>

                        <tr>
                            <td>Action</td>
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

export default Cohortactivity;
