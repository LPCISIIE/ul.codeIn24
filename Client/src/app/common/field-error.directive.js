
export default function FieldErrorDirective () {
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      scope.$watch(attrs.fieldError, (value) => {
        if (value) {
          element.addClass('error')
        } else {
          element.removeClass('error')
        }
      })
    }
  }
}
