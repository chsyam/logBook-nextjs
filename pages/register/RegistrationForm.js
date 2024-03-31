import { useEffect, useState } from "react";
import styles from "./Registration.module.css"
import axios from "axios";

export default function RegistrationForm({ isSidebarOpen }) {
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const { data: response } = await axios.get('http://localhost:8080/users/get/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response);
            } catch (error) {
                console.error(error.message);
            }
        }
        // fetchData();
    }, []);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        role: "USER"
    })

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const matchedUserNames = users?.filter(user => user.username === formData.username);
        return !(matchedUserNames.length > 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            const response = await axios.post("http://localhost:8080/register", formData);
            if (response.status === 201) {
                window.location.href = "/login";
            } else {
                console.log("Error registering user", formData);
                console.log(response);
            }
        }
        else {
            alert("User with same username already exists");
            console.log("Form data is invalid", formData);
        }
    }

    return (
        <div className={isSidebarOpen ? styles.RegistrationForm1 : styles.RegistrationForm2}>
            <div>{message}</div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>First Name:</label> </td>
                                <td>
                                    <input type="text" name="firstName" value={formData.firstName}
                                        onChange={e => handleOnChange(e)} placeholder="Enter your first name" required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Last Name:</label></td>
                                <td>
                                    <input type="text" name="lastName" value={formData.lastName}
                                        onChange={e => handleOnChange(e)}
                                        placeholder="Enter your last name" required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Username:</label></td>
                                <td>
                                    <input type="text" name="username" value={formData.username}
                                        onChange={e => handleOnChange(e)}
                                        placeholder="Enter your username" required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Email:</label></td>
                                <td>
                                    <input type="email" name="email" value={formData.email}
                                        onChange={e => handleOnChange(e)}
                                        placeholder="Enter your email" required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Mobile Number:</label></td>
                                <td>
                                    <input type="number" name="mobileNumber" value={formData.mobileNumber} onChange={e => handleOnChange(e)}
                                        placeholder="Enter your Mobile number" required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Password:</label></td>
                                <td>
                                    <input type="password" name="password" value={formData.password}
                                        onChange={e => handleOnChange(e)}
                                        placeholder="Enter your password" required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Confirm Password:</label></td>
                                <td>
                                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={e => handleOnChange(e)}
                                        placeholder="Re-eneter your password" required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <input type="submit" value="Register" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}