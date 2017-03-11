import GuestMiddleware from 'middleware/guest.middleware'
// import AuthMiddleware from 'middleware/auth.middleware'

import HomeController from 'app/home/home.controller'
import LoginController from 'app/authentication/login.controller'
import RegisterController from 'app/authentication/register.controller'
import SearchController from 'app/jamendo-search/search.controller'
import RoomController from 'app/rooms/room.controller'

export default function route ($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('app/home/home.html'),
      controller: HomeController,
      controllerAs: 'Home'
    })
    .state('login', {
      url: '/login',
      template: require('app/authentication/login.html'),
      controller: LoginController,
      controllerAs: 'Login',
      onEnter: GuestMiddleware
    })
    .state('register', {
      url: '/register',
      template: require('app/authentication/register.html'),
      controller: RegisterController,
      controllerAs: 'Register',
      onEnter: GuestMiddleware
    })
    .state('search', {
      url: '/search',
      template: require('app/jamendo-search/search.html'),
      controller: SearchController,
      controllerAs: 'Search'
    })
    .state('rooms', {
      url: '/rooms',
      template: require('app/rooms/rooms.html')
    })
    .state('room', {
      url: '/rooms/:id',
      template: require('app/rooms/room.html'),
      controller: RoomController,
      controllerAs: 'Room'
    })
}
