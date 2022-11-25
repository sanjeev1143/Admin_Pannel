import { useState, useEffect } from "react";
import Index from ".";
import { getData } from "../../api";
import styles from "../../styles/CohortFeedback.module.css";

const CohortStoreFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const run = async () => {
            const response = await getData("CohortStoreFeedbacks");
            setFeedbacks(response);
        };

        run();
    }, []);

    return (
        <div className={styles.main}>
            <Index />

            <table>
                <thead>
                    <tr>
                        <th>Instructor Rating</th>
                        <th>Thumb</th>
                        <th>Topic Rating</th>
                        <th>Suggestion</th>
                    </tr>
                </thead>

                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback.id}>
                            <td>{feedback["Instructor Rate"]}</td>
                            <td>{feedback["Thumb"]}</td>
                            <td>{feedback["Topic Rate"]}</td>
                            <td>{feedback["otherSuggestion"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CohortStoreFeedback;
