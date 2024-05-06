import { useEffect, useState } from "react";
import styles from "./../Transactions.module.css"
import axios from "axios";

export default function TransactionHistory() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:8080/transactions/get/all');
                setData(response);
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);


    return (
        <div className={""}>
            <div className={styles.h1}>History</div>
            <div className={styles.history}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Transaction Owner</th>
                            <th>Date</th>
                            <th>Members Included</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.description}</td>
                                <td>{"₹ " + item.amount}</td>
                                <td>{item.owner}</td>
                                <td>{item.transactionDate}</td>
                                <td>
                                    {
                                        item.users_included.join(" , ")
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}