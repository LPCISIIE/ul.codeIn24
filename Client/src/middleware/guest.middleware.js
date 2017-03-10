
export default function GuestMiddleware ($state, AuthService) {
  if (AuthService.getUser()) {
    if ($state.$current.abstract) {
      $state.go('home')
    } else {
      $state.go($state.current)
    }
  }
}

GuestMiddleware.$inject = ['$state', 'AuthService']
