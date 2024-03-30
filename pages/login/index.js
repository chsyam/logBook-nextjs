import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import styles from "@/styles/index.module.css"
import { useState } from "react";
import Login from "./Login";

export default function LoginImpl() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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