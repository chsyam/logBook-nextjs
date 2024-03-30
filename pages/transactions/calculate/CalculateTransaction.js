import { useEffect, useState } from "react";
import styles from "./../Transactions.module.css"

export default function CalculateTransaction() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const { data: response } = await axios.get('http://localhost:8080/transactions/get/all',
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    });
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        // fetchData();
    }, []);

    const [owner, setOwner] = useState("syamkumar ch")

    const handleChange = (e) => {
        setOwner(e.target.value);
    }

    const CalculateTotal = (userName, ownerName) => {
        let total = 0;
        if (data.length === 0)
            return "Nothing"
        data.forEach((transaction) => {
            if (transaction.owner === ownerName && transaction.users_included.includes(userName)) {
                total += transaction.amount / transaction.users_included.length;
            }
        });
        return total;
    }

    return (
        <div className={styles.calculateSection}>
            <span>Whose Amount should be calculate? <div className={styles.name}>{owner}</div></span>
            <select value={owner} onChange={handleChange}>
                {/* {props.users.map((user, index) => (
                    <option value={user.userName} key={index}>
                        {user.userName}
                    </option>
                ))} */}
            </select>
            <div className={styles.calculate}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            props.users.map((user, index) => (
                                user.userName !== owner && (
                                    <tr key={index}>
                                        <td>{user.userName}</td>
                                        <td>{"₹ " + CalculateTotal(user.userName, owner)}</td>
                                    </tr>
                                )
                            ))
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}