import route from 'routes'
import JWTInterceptor from 'app/authentication/jwt.interceptor'

export default function config ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({
    'enabled': true,
    'requireBase': false
  })

  // Add Authorization header with JWT if user is authenticated
  $httpProvider.interceptors.push(JWTInterceptor)

  // Application routes
  route($stateProvider)
  $urlRouterProvider.otherwise('/')
}

config.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider']
