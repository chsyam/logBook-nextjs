import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import TransactionHistory from "./transactionHistory";
import styles from "./../Transactions.module.css"

export default function History() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.bodySection}>
                <TransactionHistory />
            </div>
        </div>
    );
}