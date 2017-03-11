
export default function RoomAccount ($resource, API) {
  return $resource(API.url + '/rooms/:room_id/messages/:message_id', {
    room_id: '@room_id',
    message_id: '@message_id'
  }, {
    update: { method: 'PUT' }
  })
}

RoomAccount.$inject = ['$resource', 'API']
