export default class SearchService {
  constructor ($state, $resource, Search) {
    this.Search = Search
    this.$state = $state
    this.result = []
  }

  searchTrack (keyword) {
    return this.Search.searchtracks({search: keyword}, (response) => {
      let res = response
      this.result.push(res.results)
    }, () => {
      this.$state.go('home')
    }).$promise
  }

  searchByArtist (keyword) {
    return this.Search.searchbyartists({artist_name: keyword}, (response) => {
      let res = response
      this.result.push(res.results)
    }, () => {
      this.$state.go('home')
    }).$promise
  }

  searchByAlbum (keyword) {
    return this.Search.searchbyalbums({album_name: keyword}, (response) => {
      let res = response
      this.result.push(res.results)
    }, () => {
      this.$state.go('home')
    }).$promise
  }

  searchByName (keyword) {
    return this.Search.searchbyname({namesearch: keyword}, (response) => {
      let res = response
      this.result.push(res.results)
    }, () => {
      this.$state.go('home')
    }).$promise
  }
}

SearchService.$inject = ['$state', '$resource', 'Search']
