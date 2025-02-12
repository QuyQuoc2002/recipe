import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authroization: localStorage.getItem("token"),
    },
});

export default httpRequest;
