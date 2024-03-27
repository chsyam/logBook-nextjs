import styles from "./Registration.module.css"
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import RegistrationForm from "./RegistrationForm";

export default function Home() {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className={styles.formBody}>
                <RegistrationForm />
            </div>
        </div>
    );
}