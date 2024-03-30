import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import styles from "./../styles/index.module.css"
import { useState } from "react";

export default function Home() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<div>
			<Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
			<Navbar />
			<div style={{ backgroundColor: "#e4e9f7" }}>
				<div className={isSidebarOpen ? styles.home1 : styles.home2}>

				</div>
			</div>
		</div>
	);
}
