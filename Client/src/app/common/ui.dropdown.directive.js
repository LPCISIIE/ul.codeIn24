
export default function UIDropdownDirective () {
  return {
    restrict: 'A',
    link: (scope, element) => {
      element.dropdown()
    }
  }
}
