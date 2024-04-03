import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import TransactionHistory from "./transactionHistory";
import styles from "./../../../styles/index.module.css"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function History() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (!Cookies.get("username")) {
            window.location.href = "/login";
        }
    })


    return (
        <div>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Navbar />
            <div className={isSidebarOpen ? styles.home1 : styles.home2}>
                <TransactionHistory />
            </div>
        </div>
    );
}