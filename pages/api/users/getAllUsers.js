import axios from "axios";

export async function getAllUsers() {
    try {
        const res = await axios.get("https://expenses-028t.onrender.com/users/get/all");
        console.log(res.data, typeof (res.data));
        return res.data;
    } catch (error) {
        console.log(error)
    }
}