import styles from "./Navbar.module.css"
import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter();

    return (
        <div className={styles.navbar}>
            <div className={styles.title} onClick={() => router.push("/")}>
                <div>
                    LogBook
                </div>
            </div>
            <div className={styles.menu}>
                <ul className={styles.menuLinks}>
                    <li onClick={() => router.push("/")}>
                        Home
                    </li>
                    <li onClick={() => router.push("/about")}>
                        About
                    </li>
                    <li onClick={() => router.push("/contact")}>
                        Contact
                    </li>
                    <li onClick={() => router.push("/login")}>
                        Login
                    </li>
                    <li onClick={() => router.push("/register")}>
                        Register
                    </li>
                </ul>
            </div >
        </div >
    )
}