import Link from "next/link"
import styles from "./Login.module.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Login() {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleonSubmit = async (e) => {
        setStatus(true);
        e.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post("http://localhost:8080/login", formData);
            if (response.status === 200) {
                Cookies.set("username", response.data.username, { expires: 24 })
                window.location.href = "/dashboard";
            }
        } catch (error) {
            if (error?.response?.status === 401 || error?.response?.status === 500) {
                setMessage("Invalid username or password...!")
            } else {
                setMessage("Something went wrong...! Please try again later");
            }
        }
        setStatus(false);
    }

    return (
        <div className={styles.loginForm}>
            <form className={styles.form} onSubmit={(e) => handleonSubmit(e)}>
                {
                    message.length !== 0 && (
                        <div className={styles.error}>{message}</div>
                    )
                }
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Username: </label>
                            </td>
                            <td><input type="text" name="username" value={formData.username} onChange={(e) => handleOnChange(e)} placeholder="Enter username" /></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password: </label>
                            </td>
                            <td><input type="password" name="password" onChange={(e) => handleOnChange(e)} value={formData.password} placeholder="Enter password" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                <input
                                    style={{ cursor: status ? "not-allowed" : "pointer" }}
                                    type="submit"
                                    value={status ? "..." : "Login"}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                <Link href="/forgot-password">{"Forgot password?"}</Link>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                <Link href="/register">{"Don't have an account? Signup here"}</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div >
    )
}