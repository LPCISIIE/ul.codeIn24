export default function Search ($resource, JAMENDO_API) {
  return $resource(JAMENDO_API.url, { keyword: '@keyword' }, {
    searchtracks: {
      method: 'GET',
      url: JAMENDO_API.url + '/tracks/?client_id=56d30c95&search=Bane'
    },
    searchartists: {
      method: 'GET',
      url: JAMENDO_API.url + '/artists'
    },
    searchalbums: {
      method: 'GET',
      url: JAMENDO_API.url + '/albums'
    }
  })
}

Search.$inject = ['$resource', 'JAMENDO_API']
