import axios from 'axios';
import { createToast } from 'mosha-vue-toastify';
import router from '@/router'

import { useAppStore } from '@/store/app'
import { refreshToken } from './auth'



const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API
})

api.interceptors.request.use(request => {
    let accessToken = localStorage.getItem('access_token');

    if (accessToken && accessToken !== '') {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return request
})


function createAxiosResponseInterceptor() {
    const interceptor = api.interceptors.response.use(
        response => response,
        error => {

            if (error.response.status === 403 || error.response.status === 405) {
                createToast('User not authorized', { type: 'danger' })
                router.push('/')
                return Promise.resolve(error)
            } else if (error.response.status === 500) {
                createToast('Server error', { type: 'danger' })
                return Promise.reject(error)
            } else if (error.response.status !== 401) {
                return Promise.reject(error)
            }

            api.interceptors.response.eject(interceptor)

            const refresh_token = localStorage.getItem("refresh_token")
            if(refresh_token){
                return refreshToken(localStorage.getItem("refresh_token"))
                .then(response => {
                    localStorage.setItem("access_token", response.data.access)
                    error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access
                    return api(error.response.config)
                }).catch(error => {

                    if (error.response.config.url === 'api/token/refresh/') {
                        createToast('Session expired', { type: 'danger' })
                        const appStore = useAppStore();
                        const { logout } = appStore;
                        logout();
                    }
                    return Promise.resolve(error);
                    
                }).finally(() => createAxiosResponseInterceptor(api))
            }

            return Promise.reject(error);

        }

    )
}

createAxiosResponseInterceptor()

export default api

