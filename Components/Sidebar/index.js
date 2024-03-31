import { useState } from 'react';
import styles from './Sidebar.module.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { ImHistory } from "react-icons/im";
import { FaCalculator, FaChevronRight } from "react-icons/fa";
import { useRouter } from 'next/router';
import Link from 'next/link';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.close} ${isDarkMode ? styles.dark : ''}`}>
            <header>
                <i className={styles.toggle} onClick={toggleSidebar}>
                    <FaChevronRight />
                </i>
            </header>

            <div className={styles.menuBar}>
                <div className={styles.menu}>
                    <ul className={styles.menuLinks}>
                        <li className={styles.navLink}>
                            <a onClick={() => router.push("/dashboard")}>
                                <i className={styles.icon}>
                                    <RxDashboard />
                                </i>
                                <span className={`${styles.text} ${styles.navText}`}>Dashboard</span>
                            </a>
                        </li>

                        <li className={styles.navLink}>
                            <a onClick={() => router.push("/transactions/add")}>
                                <i className={styles.icon}>
                                    <IoIosAddCircleOutline />
                                </i>
                                <span className={`${styles.text} ${styles.navText}`}>Add Transaction</span>
                            </a>
                        </li>

                        <li className={styles.navLink}>
                            <a onClick={() => router.push("/transactions/history")}>
                                <i className={styles.icon}>
                                    <ImHistory />
                                </i>
                                <span className={`${styles.text} ${styles.navText}`}>Transaction History</span>
                            </a>
                        </li>

                        <li className={styles.navLink}>
                            <a onClick={() => router.push("/transactions/calculate")}>
                                <i className={styles.icon}>
                                    <FaCalculator />
                                </i>
                                <span className={`${styles.text} ${styles.navText}`}>Calculate</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
