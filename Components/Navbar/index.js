import Cookies from "js-cookie";
import styles from "./Navbar.module.css"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoPower } from "react-icons/io5";

export default function Navbar() {
    const router = useRouter();
    const [profileView, setProfileView] = useState(false);
    const dropdownRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });
            if (response.ok) {
                Cookies.remove("username");
                setIsLoggedIn(false);
                console.log("Logout Successfull");
                router.push('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    useEffect(() => {
        const username = Cookies.get("username");
        console.log(username)
        if (username) {
            setIsLoggedIn(true)
        }
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileView(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    {
                        !isLoggedIn &&
                        <li onClick={() => router.push("/login")}>
                            Login
                        </li>
                    }
                    {!isLoggedIn &&
                        <li onClick={() => router.push("/register")}>
                            Register
                        </li>
                    }
                    {
                        isLoggedIn &&
                        <li onClick={() => setProfileView(!profileView)}>
                            <FaRegUser />
                            {
                                profileView &&
                                <div className={`${styles.profileMenu} ${styles.dropdownContent}`} ref={dropdownRef}>
                                    <div className={styles.username}>Hi, Syam kumar</div>
                                    <ul>
                                        <li>Profile</li>
                                        <li>Dark View</li>
                                        <li className={styles.optionInline} onClick={() => handleLogout()}>
                                            <div>Logout</div>
                                            <div className={styles.icon}><IoPower /></div>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </li>
                    }
                </ul>
            </div >
        </div >
    )
}