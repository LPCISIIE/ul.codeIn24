
export default function ChatDirective ($stateParams, RoomMessage) {
  return {
    restrict: 'E',
    template: require('app/rooms/chat.directive.html'),
    scope: {
      token: '='
    },
    link: (scope, element) => {
      scope.post = {
        body: ''
      }

      RoomMessage.query({ room_id: $stateParams.id }, messages => {
        scope.messages = messages
      })

      scope.formatDate = (date) => {
        return new Date(date)
      }

      scope.onKeyup = (event) => {
        if (event.key === 'Enter') {
          element.find('.ui.form input').val('')
          let data = scope.post
          data.token = scope.token
          RoomMessage.save({ room_id: $stateParams.id }, data, () => {
            scope.post = {
              body: ''
            }
            RoomMessage.query({ room_id: $stateParams.id }, messages => {
              scope.messages = messages
            })
          })
        }
      }
    }
  }
}

ChatDirective.$inject = ['$stateParams', 'RoomMessage']
