import styles from "./Registration.module.css"
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import RegistrationForm from "./RegistrationForm";
import { useState } from "react";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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