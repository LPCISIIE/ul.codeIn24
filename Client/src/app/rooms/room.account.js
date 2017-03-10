
export default function RoomAccount ($resource, API) {
  return $resource(API.url + '/rooms/:room_id/accounts/:account_id', {
    room_id: '@room_id',
    account_id: '@account_id'
  }, {
    update: {
      method: 'PUT'
    },
    get: {
      method: 'GET',
      url: API.url + '/rooms/:room_id/accounts/me?token'
    }
  })
}

RoomAccount.$inject = ['$resource', 'API']
