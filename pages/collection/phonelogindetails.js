import { useState, useEffect } from "react";
import Index from ".";
import styles from "../../styles/Phone.module.css";
import { getData } from "../../api";

const Phonelogindetails = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const run = async () => {
            const response = await getData("phoneLoginDetails");
            setUsers(response);
        };

        run();
    }, []);

    return (
        <div className={styles.main}>
            <Index />

            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>DOB</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.usernameList}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.dob}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Phonelogindetails;
