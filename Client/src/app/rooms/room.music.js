
export default function RoomMusic ($resource, API) {
  return $resource(API.url + '/rooms/:room_id/musics/:music_id', {
    room_id: '@room_id',
    music_id: '@music_id'
  }, {
    update: { method: 'PUT' },
    next: {
      method: 'POST',
      url: API.url + '/rooms/:room_id/musics/next'
    }
  })
}

RoomMusic.$inject = ['$resource', 'API']
