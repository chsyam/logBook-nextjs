import Link from "next/link"
import styles from "./Login.module.css"

export default function Login() {
    return (
        <div className={styles.loginForm}>
            <form className={styles.form}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Username: </label>
                            </td>
                            <td><input type="text" placeholder="Enter username" /></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password: </label>
                            </td>
                            <td><input type="password" placeholder="Enter password" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                <input type="submit" value="Login" />
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