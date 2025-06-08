import axios from "axios";

const instance = axios.create({
  baseURL: "http://160.187.229.165:5000",
});

// Tự động gắn token vào header nếu có
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;