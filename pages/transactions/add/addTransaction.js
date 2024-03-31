import { useEffect, useState } from "react";
import styles from "./../Transactions.module.css";
import { getAllUsers } from "@/pages/api/users/getAllUsers";
import axios from "axios";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";

export default function AddTransaction() {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [checked, setChecked] = useState([]);
    const ownerName = Cookies.get("username")
    const [owner, setOwner] = useState(ownerName);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const router = useRouter();

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + "," + item;
        })
        : "";

    var isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";
    useEffect(() => {
        const getAllUsersList = async () => {
            const res = await getAllUsers();
            setUsers(res);
            console.log(res);
        }
        getAllUsersList();
    }, [])

    const handleSubmit = async (event) => {
        setShow(true);
        event.preventDefault();
        if (amount !== 0 && checkedItems.length !== 0 && description.length > 2) {
            try {
                const users_included = [];
                checkedItems.split(",").forEach(item => {
                    users_included.push(item.trim());
                })
                console.log(users_included);
                const response = await axios.post('http://localhost:8080/transactions/save',
                    {
                        "amount": amount, "description": description, "users_included": users_included, "owner": owner
                    },
                );
                if (response.status === 201) {
                    setShow(true);
                    router.push("/transactions/history");
                } else {
                    setShow(false);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <div className={styles.addTransactionForm}>
            <div className={styles.h1}>Add Transaction</div>
            <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
                <div className={styles.form_div}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Amount:</td>
                                <td>
                                    <input className={styles.amount} type="number" onChange={(event) => setAmount(event.target.value)} placeholder="enter amount" required />
                                </td>
                            </tr>
                            <tr>
                                <td>Owner:</td>
                                <td className={styles.selection}>
                                    <select value={owner} onChange={(e) => { setOwner(e.target.value) }}>
                                        {users.map((user, index) => (
                                            <option value={user.username} key={index}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>
                                    <textarea className={styles.description} required rows="3" cols="20" type="text" onChange={(event) => setDescription(event.target.value)} placeholder="amount description" />
                                </td>
                            </tr>
                            <tr className={styles.checkList}>
                                <td>Members:</td>
                                <td className={`${styles.list} ${styles.container}`}>
                                    {users.map((user, index) => (
                                        <div key={index}>
                                            <input className={styles.checkbox} id={index} value={user.username} type="checkbox" onChange={handleCheck} />
                                            <label htmlFor={index} className={isChecked(user.username)}>{user.username}</label>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr className={styles.members}>
                                <td colSpan="2" className={styles.checkedItems}>
                                    {checkedItems}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.buttons}>
                        <input type="reset" className={styles.cancel} value="Cancel" />
                        <input type="submit" className={styles.submit} value={show ? "Submitting" : "Submit"} style={{ cursor: !show ? "auto" : "not-allowed" }} />
                    </div>
                </div>
            </form >
        </div >
    );
}
