import styles from "./Navbar.module.css"
import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();

    return (
        <div className={styles.navbar}>
            <div>
                <div className={styles.title} onClick={() => router.push("/")}>LogBook</div>
            </div>
            <div className={styles.menu}>
                <div className={styles.menu_item} onClick={() => router.push("/login")}>Login</div>
                <div className={styles.menu_item} onClick={() => router.push("/registration")}>Registration</div>
            </div>
        </div>
    )
}