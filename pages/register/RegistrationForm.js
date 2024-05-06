import { useEffect, useState } from "react";
import styles from "./Registration.module.css"
import axios from "axios";

export default function RegistrationForm({ isSidebarOpen, usersList }) {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "USER"
    })

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const matchedUserNames = usersList?.filter(user => user.username.toLowerCase() === formData.username.toLowerCase());
        const matchedEmails = usersList?.filter(user => user.email.toLowerCase() === formData.email.toLowerCase());
        const matchedPhoneNumbers = usersList?.filter(user => user.phoneNumber === formData.phoneNumber);
        if (matchedUserNames.length > 0) {
            alert("user with same username already exists");
            return false;
        }
        else if (matchedEmails.length > 0) {
            alert("user with same email already exists");
            return false;
        }
        else if (matchedPhoneNumbers.length > 0) {
            alert("user with same phone number already exists");
            return false;
        }
        else if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return false;
        }
        else if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long");
            return false;
        }
        else if (formData.firstName.length < 3) {
            alert("First name must be at least 3 characters long");
            return false;
        }
        else if (formData.lastName.length < 3) {
            alert("Last name must be at least 3 characters long");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        setStatus(true);
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            console.log(formData);
            const response = await axios.post("http://localhost:8080/register", formData);
            if (response.status === 201) {
                window.location.href = "/login";
            } else {
                console.log("Error registering user", formData);
                console.log(response);
            }
        }
        setStatus(false);
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
                                    <input type="number" name="phoneNumber" value={formData.phoneNumber}
                                        onChange={e => handleOnChange(e)}
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
                                    <input
                                        type="submit"
                                        value={status ? "Registering..." : "Register"}
                                        style={{ cursor: status ? "not-allowed" : "pointer" }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
}