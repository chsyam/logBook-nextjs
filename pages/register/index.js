import styles from "./Registration.module.css"
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import RegistrationForm from "./RegistrationForm";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Home({ usersList }) {
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
                <RegistrationForm isSidebarOpen={isSidebarOpen} usersList={usersList} />
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const response_usersList = await axios.get('https://expense-management-i3ud.onrender.com/users/get/all');
        const usersList = response_usersList.data;

        console.log("usersList", usersList);
        return {
            props: {
                usersList: usersList,
            }
        }
    } catch (err) {
        console.log("Error", err);
        return {
            props: {
                usersList: [],
            },
        };
    }
}