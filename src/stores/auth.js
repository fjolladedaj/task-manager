import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const userDetails = localStorage.getItem('auth')
    if (userDetails) {
      const userDetailsParsed = JSON.parse(userDetails)
      return {
        token: userDetailsParsed.token,
        user: JSON.parse(userDetailsParsed.user)
      }
    }
    return { token: null, user: null }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.user
  },
  actions: {
    setUserAndUserToken(user, token) {
      this.user = user
      this.token = token

      localStorage.setItem(
        'auth',
        JSON.stringify({ user: JSON.stringify(this.user), token: this.token })
      )
    },
    resetData() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth')
    }
  }
})
