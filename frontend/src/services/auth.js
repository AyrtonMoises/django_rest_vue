import api from './api'

import { googleTokenLogin } from "vue3-google-login"


export const loginGoogleService = () => {

    return googleTokenLogin().then((response) => {
        const token = response.access_token

        return api.post('/api/register-by-access-token/social/google-oauth2/', {
            access_token: token
        })
        
    })
}


export const loginTokenUsername = (data) => {
    return api.post('/api/token/', data)
}

export const refreshToken = async (refresh_token) => {
    return await api.post(
        "api/token/refresh/", {
        refresh: refresh_token
      })

}