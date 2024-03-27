import { useState } from "react";
import styles from "./../Transactions.module.css";

export default function AddTransaction(props) {
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [checked, setChecked] = useState([]);
    const [owner, setOwner] = useState("syamkumar ch");
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (amount !== 0 && checkedItems.length !== 0 && description.length > 2) {
            try {
                const token = Cookies.get('token');
                const users_included = [];
                checkedItems.split(",").forEach(item => {
                    users_included.push(item.trim());
                })

                console.log(users_included);
                const response = await axios.post('http://localhost:8080/transactions/save',
                    {
                        "amount": amount, "description": description, "users_included": users_included, "owner": owner
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                    }
                );
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        props.setHistoryButton(true);
        props.setAddButton(false);
    }

    return (
        <div>
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
                                        {/* {props.users.map((user, index) => (
                                            <option value={user.userName} key={index}>
                                                {user.userName}
                                            </option>
                                        ))} */}
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
                                    {/* {props.users.map((item, index) => (
                                        <div className={styles."}key={index}>
                                            <input className={styles.checkbox} id={index} value={item.userName} type="checkbox" onChange={handleCheck} />
                                            <label htmlFor={index} className={isChecked(item.userName)}>{item.userName}</label>
                                        </div>
                                    ))} */}
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
                        <input type="submit" className={styles.submit} value="Submit" />
                    </div>
                </div>
            </form >
        </div >
    );
}
