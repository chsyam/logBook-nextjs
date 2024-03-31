import Cookies from "js-cookie";

export default function handler(req, res) {
    res.status(200).json({ message: "Logged out successfully" });
}