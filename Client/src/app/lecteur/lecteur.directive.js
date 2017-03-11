
export default function LecteurDirective () {
  return {
    restrict: 'E',
    template: require('./lecteur.directive.html'),
    link: (scope) => {
      console.log(scope)
    }
  }
}

LecteurDirective.$inject = []
