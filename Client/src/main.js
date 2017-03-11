import 'assets/scss/app.scss'
import 'assets/scss/chat.scss'

import angular from 'angular'
import resource from 'angular-resource'
import router from 'angular-ui-router'

import config from 'config'
import JWTService from 'app/authentication/jwt.service'
import AuthService from 'app/authentication/authentication.service'
import SearchService from 'app/jamendo-search/search.service'

import User from 'app/user/user'
import Search from 'app/jamendo-search/search'
import Room from 'app/rooms/room'
import RoomAccount from 'app/rooms/room.account'
import RoomMessage from 'app/rooms/room.message'

import TopbarDirective from 'app/topbar/topbar.directive'
import LecteurDirective from 'app/lecteur/lecteur.directive'
import ChatDirective from 'app/rooms/chat.directive'
import FieldErrorDirective from 'app/common/field-error.directive'
import FieldErrorsDirective from 'app/common/field-errors.directive'
import UIDropdownDirective from 'app/common/ui.dropdown.directive'

import LecteurController from 'app/lecteur/lecteur.controller.js'

export default angular.module('app', [resource, router])
  .constant('API', {
    url: 'http://localhost/Hackathon/Server/public'
  })
  .constant('JAMENDO_API', {
    url: 'https://api.jamendo.com/v3.0'
  })
  .factory('User', User)
  .factory('Search', Search)
  .service('JWTService', JWTService)
  .service('AuthService', AuthService)
  .service('SearchService', SearchService)
  .config(config)
  .factory('Room', Room)
  .factory('RoomAccount', RoomAccount)
  .factory('RoomMessage', RoomMessage)
  .directive('topbar', TopbarDirective)
  .directive('lecteur', LecteurDirective)
  .directive('chat', ChatDirective)
  .directive('fieldError', FieldErrorDirective)
  .directive('fieldErrors', FieldErrorsDirective)
  .directive('uiDropdown', UIDropdownDirective)
  .controller('Lecteur', LecteurController)
  .run(['$transitions', $transitions => {
    $transitions.onSuccess({}, trans => {
      if (trans.injector().get('JWTService').getAccessToken()) {
        trans.injector().get('AuthService').check()
      }
    })
  }])
