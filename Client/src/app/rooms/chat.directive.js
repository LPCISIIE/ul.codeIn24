
export default function ChatDirective ($stateParams, $interval, RoomMessage) {
  return {
    restrict: 'E',
    template: require('app/rooms/chat.directive.html'),
    scope: {
      token: '='
    },
    link: (scope, element) => {
      let loadMessages = () => {
        RoomMessage.query({ room_id: $stateParams.id }, messages => {
          scope.messages = messages
        })
      }

      scope.post = {
        body: ''
      }

      loadMessages()

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
            loadMessages()
          })
        }
      }

      // $interval(loadMessages, 2000)
    }
  }
}

ChatDirective.$inject = ['$stateParams', '$interval', 'RoomMessage']
