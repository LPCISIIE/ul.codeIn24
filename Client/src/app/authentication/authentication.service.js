
export default class AuthService {
  constructor ($rootScope, $window, JWTService, User) {
    this.$rootScope = $rootScope
    this.localStorage = $window.localStorage
    this.JWTService = JWTService
    this.User = User
  }

  getUser () {
    let user = this.localStorage.getItem('user')

    return user ? JSON.parse(user) : null
  }

  check () {
    return this.User.me(user => {
      this.$rootScope.user = user
      this.localStorage.setItem('user', JSON.stringify(user))
    }).$promise
  }

  login (credentials) {
    return this.User.login(credentials, jwt => {
      this.JWTService.setAccessToken(jwt.access_token)
      this.JWTService.setRefreshToken(jwt.refresh_token)
    }).$promise
  }

  register (credentials) {
    return this.User.register(credentials).$promise
  }

  refresh () {
    return this.User.refresh({ refresh_token: this.JWTService.getRefreshToken() }, jwt => {
      this.JWTService.setAccessToken(jwt.access_token)
      this.JWTService.setRefreshToken(jwt.refresh_token)
    }, () => {
      this.logout()
    }).$promise
  }

  logout () {
    this.$rootScope.user = undefined
    this.localStorage.removeItem('user')
    this.JWTService.removeTokens()
  }
}

AuthService.$inject = ['$rootScope', '$window', 'JWTService', 'User']
