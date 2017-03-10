export default class SearchService {
  constructor ($state, $resource, Search) {
    this.Search = Search
    this.$state = $state
    this.result = []
  }

  searchTrack (keyword) {
    return this.Search.searchtracks({search: keyword}, (response) => {
      this.result = response
    }, () => {
      this.$state.go('home')
    }).$promise
  }

  searchAlbum () {

  }

  searchArtist () {

  }
}

SearchService.$inject = ['$state', '$resource', 'Search']
