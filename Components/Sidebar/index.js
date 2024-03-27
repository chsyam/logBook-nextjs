import { useRouter } from "next/router";
import styles from "./sidebar.module.css"

export default function Sidebar() {
    const router = useRouter();

    return (
        <div className={styles.sidebar}>
            <div className={styles.item} onClick={() => router.push("/transactions/add")}>Add Transaction</div>
            <div className={styles.item} onClick={() => router.push("/transactions/history")}>History</div>
            <div className={styles.item} onClick={() => router.push("/transactions/calculate")}>Calculate</div>
            <div className={styles.item} onClick={() => router.push("/rooms/join")}>Create / Join Room</div>
        </div>
    );
}