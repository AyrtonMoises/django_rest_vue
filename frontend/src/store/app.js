// Utilities
import { defineStore } from 'pinia'

import { createToast } from 'mosha-vue-toastify';

import router from '@/router'
import { loginGoogleService, loginTokenUsername } from '@/services/auth';
import parseJWT from '../utils/parseJWT'


export const useAppStore = defineStore('app', {
  state: () => {
      return {
          is_connected: localStorage.getItem('access_token') || false,
          returnUrl: null,
          isAdminUser: parseJWT(localStorage.getItem('access_token'))?.is_superuser || null
      }
  },
  actions: {
    loginUsername(data) {
      loginTokenUsername(data)
        .then((response) => {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          const tokenData = parseJWT(response.data.access)
          this.isAdminUser = tokenData.is_superuser
          this.is_connected = true;
          router.push(this.returnUrl || '/');
        })
        .catch(error => {
          createToast("Username/Password is wrong", {type: 'danger'})
          }
        )
      },
      loginGoogle() {
        loginGoogleService()
          .then((response) => {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            this.is_connected = true;
            router.push(this.returnUrl || '/');
          })
          .catch(error => {
            createToast("Login Invalid", {type: 'danger'})
            }
          )
        },
        logout() {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.is_connected = false;
          this.isAdminUser = null;
          router.push('/login');
        }
  },})


