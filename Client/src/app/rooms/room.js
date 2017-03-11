
export default function Room ($resource, API) {
  return $resource(API.url + '/rooms/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  })
}

Room.$inject = ['$resource', 'API']
