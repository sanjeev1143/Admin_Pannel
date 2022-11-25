import { useState, useEffect } from "react";
import Index from ".";
import { getData } from "../../api";
import styles from "../../styles/Feedback.module.css";

const Storefeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const run = async () => {
            const response = await getData("storeFeedback");
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
                        <th>Rating</th>
                        <th>Seleted options</th>
                        <th>Suggestions</th>
                    </tr>
                </thead>

                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback.id}>
                            <td>{feedback.stars}</td>
                            <td>{feedback.selectedSuggestions}</td>
                            <td>{feedback.otherSuggestion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Storefeedback;
