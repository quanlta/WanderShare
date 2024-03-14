import axios from 'axios';

const customPort = 8080; // Đổi thành cổng bạn muốn sử dụng

// Cấu hình Axios sử dụng cổng mặc định
axios.defaults.baseURL = `http://localhost:${customPort}`;

export default axios;
