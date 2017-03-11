export default function Search ($resource, JAMENDO_API) {
  return $resource(JAMENDO_API.url, { keyword: '@keyword' }, {
    searchtracks: {
      method: 'GET',
      url: JAMENDO_API.url + '/tracks/?client_id=56d30c95&limit=200&search='
    },
    searchbyartists: {
      method: 'GET',
      url: JAMENDO_API.url + '/artists/?client_id=56d30c95&artist_name='
    },
    searchbyalbums: {
      method: 'GET',
      url: JAMENDO_API.url + '/albums/?client_id=56d30c95&album_name='
    },
    searchbyname: {
      method: 'GET',
      url: JAMENDO_API.url + '/tracks/?client_id=56d30c95&namesearch='
    }
  })
}

Search.$inject = ['$resource', 'JAMENDO_API']
