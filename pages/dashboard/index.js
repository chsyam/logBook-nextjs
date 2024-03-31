import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { useEffect, useState } from "react";
import styles from "../../styles/index.module.css";
import Cookies from "js-cookie";



export default function Dashboard() {
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
            <div className={isSidebarOpen ? styles.hom1 : styles.home2}>

            </div>
        </div>
    );
}