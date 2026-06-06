import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://localhost:7098/api',   // 👈 THAY SỐ CỔNG CHO ĐÚNG VỚI BACKEND CỦA BẠN
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('Lỗi kết nối API:', error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;