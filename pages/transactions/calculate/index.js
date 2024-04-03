import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import styles from "./../../../styles/index.module.css"
import CalculateTransaction from "./CalculateTransaction";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Calculate() {
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
                <CalculateTransaction />
            </div>
        </div>
    );
}