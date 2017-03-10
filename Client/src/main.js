import 'assets/scss/app.scss'

import angular from 'angular'
import resource from 'angular-resource'
import router from 'angular-ui-router'

import config from 'config'
import JWTService from 'app/authentication/jwt.service'
import AuthService from 'app/authentication/authentication.service'

import User from 'app/user/user'

import TopbarDirective from 'app/topbar/topbar.directive'
import FieldErrorDirective from 'app/common/field-error.directive'
import FieldErrorsDirective from 'app/common/field-errors.directive'
import UIDropdownDirective from 'app/common/ui.dropdown.directive'

export default angular.module('app', [resource, router])
  .constant('API', {
    url: 'http://localhost:8080'
  })
  .factory('User', User)
  .service('JWTService', JWTService)
  .service('AuthService', AuthService)
  .config(config)
  .directive('topbar', TopbarDirective)
  .directive('fieldError', FieldErrorDirective)
  .directive('fieldErrors', FieldErrorsDirective)
  .directive('uiDropdown', UIDropdownDirective)
  .run(['$transitions', $transitions => {
    $transitions.onSuccess({}, trans => {
      if (trans.injector().get('JWTService').getAccessToken()) {
        trans.injector().get('AuthService').check()
      }
    })
  }])
