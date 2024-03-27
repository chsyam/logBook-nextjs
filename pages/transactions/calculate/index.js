import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import styles from "./../Transactions.module.css"
import CalculateTransaction from "./CalculateTransaction";

export default function Calculate() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.bodySection}>
                <CalculateTransaction />
            </div>
        </div>
    );
}