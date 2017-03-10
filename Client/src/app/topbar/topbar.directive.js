
export default function TopbarDirective (AuthService) {
  return {
    restrict: 'E',
    template: require('./topbar.directive.html'),
    link: (scope) => {
      scope.logout = () => {
        AuthService.logout()
      }
    }
  }
}

TopbarDirective.$inject = ['AuthService']
