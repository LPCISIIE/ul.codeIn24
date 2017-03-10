
export default class JWTService {
  constructor ($window) {
    this.localStorage = $window.localStorage
  }

  setAccessToken (token) {
    this.localStorage.setItem('access_token', token)
  }

  setRefreshToken (token) {
    this.localStorage.setItem('refresh_token', token)
  }

  getAccessToken () {
    return this.localStorage.getItem('access_token')
  }

  getRefreshToken () {
    return this.localStorage.getItem('refresh_token')
  }

  removeAccessToken () {
    this.localStorage.removeItem('access_token')
  }

  removeRefreshToken () {
    this.localStorage.removeItem('refresh_token')
  }

  removeTokens () {
    this.removeAccessToken()
    this.removeRefreshToken()
  }
}

JWTService.$inject = ['$window']
