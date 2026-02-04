import { BASE_API } from '@/constants/apis'
import { notification } from 'antd';
import axios from 'axios'
import { getCookie } from 'cookies-next'

const axiosClient = axios.create({
    baseURL: BASE_API,
    headers: {
        'content-type': 'application/json'
    },
    timeout: 300000,
    timeoutErrorMessage: `Connection is timeout exceeded`
})

axiosClient.interceptors.request.use(async (config) => {
    const token = getCookie('__accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response
        }
        return response
    },
    (error) => {
        // if (error.response && error.response.status === 401) {
        //     // Tự động logout nếu token hết hạn hoặc không hợp lệ
        //     useUserStore.getState().logout();
        // }
        notification.error({
            message: 'Lỗi',
            description: error.response.data.message
        })
        return Promise.reject(error)
    }
)
export default axiosClient
