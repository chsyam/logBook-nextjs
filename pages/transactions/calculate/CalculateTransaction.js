import { useEffect, useState } from "react";
import styles from "./../Transactions.module.css"
import { getAllUsers } from "@/pages/api/users/getAllUsers";
import Cookies from "js-cookie";
import axios from "axios";

export default function CalculateTransaction() {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [owner, setOwner] = useState("")


    useEffect(() => {
        const username = Cookies.get("username")
        setOwner(username)
        const fetchUsersList = async () => {
            const resp = await getAllUsers();
            setUsers(resp);
        }
        fetchUsersList();

        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('https://expense-management-i3ud.onrender.com/transactions/get/all');
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);


    const handleChange = (e) => {
        setOwner(e.target.value);
    }

    const CalculateTotal = (username, ownerName) => {
        let total = 0;
        if (data.length === 0)
            return "Nothing"
        data?.forEach((transaction) => {
            if (transaction.owner === ownerName && transaction.users_included.includes(username)) {
                total += transaction.amount / transaction.users_included.length;
            }
        });
        return total;
    }

    return (
        <div className={styles.calculateSection}>
            <div className={styles.calculate}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Payable Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => (
                                // user.username !== owner && (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{"₹ " + CalculateTotal(user.username, owner)}</td>
                                </tr>
                                // )
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}