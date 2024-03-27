import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import AddTransaction from "./addTransaction";
import styles from "./../Transactions.module.css";

export default function AdditionTransaction() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.bodySection}>
                <AddTransaction />
            </div>
        </div>
    );
}