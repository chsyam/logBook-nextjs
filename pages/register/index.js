import styles from "./Registration.module.css"
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import RegistrationForm from "./RegistrationForm";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
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
            <div className={isSidebarOpen ? styles.hom1 : styles.home2}>
                <RegistrationForm isSidebarOpen={isSidebarOpen} />
            </div>
        </div>
    );
}