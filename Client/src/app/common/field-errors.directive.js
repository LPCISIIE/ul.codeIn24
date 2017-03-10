
export default function FieldErrorsDirective () {
  return {
    restrict: 'AE',
    template: `
      <div ng-if="errors.length" class="ui error message">
        <ul ng-if="!first && errors.length > 1">
          <li ng-repeat="error in errors">{{ error }}</li>
        </ul>
        <span ng-if="first || errors.length == 1">{{ errors[0] }}</span>
      </div>
    `,
    scope: {
      errors: '=',
      first: '='
    }
  }
}
