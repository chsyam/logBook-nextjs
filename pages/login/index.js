import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import styles from "@/styles/index.module.css"
import { useEffect, useState } from "react";
import Login from "./Login";
import Cookies from "js-cookie";

export default function LoginImpl() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (Cookies.get("username")) {
            window.location.href = "/dashboard";
        }
    })

    return (
        <div>
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Navbar />
            <div className={isSidebarOpen ? styles.home1 : styles.home2}>
                <Login />
            </div>
        </div>
    )
}