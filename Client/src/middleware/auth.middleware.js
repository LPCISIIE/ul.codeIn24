
export default function AuthMiddleware ($state, AuthService) {
  if (!AuthService.getUser()) {
    $state.go('login')
  }
}

AuthMiddleware.$inject = ['$state', 'AuthService']
