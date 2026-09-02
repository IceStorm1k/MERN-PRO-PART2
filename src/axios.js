import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-pro-13ek.onrender.com",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
})

export default instance;
