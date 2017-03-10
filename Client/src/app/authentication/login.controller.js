
export default class LoginController {
  constructor ($state, AuthService) {
    this.$state = $state
    this.AuthService = AuthService

    this.user = {}
  }

  submit () {
    this.AuthService.login(this.user).then(() => {
      this.$state.go('home')
    }, response => {
      this.errors = response.data
    })
  }
}

LoginController.$inject = ['$state', 'AuthService']
