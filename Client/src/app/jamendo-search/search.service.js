export default class SearchService {
  constructor ($state, $resource, Search) {
    this.Search = Search
    this.$state = $state
    this.result = []
  }

  searchTrack () {
    return this.Search.searchtracks((response) => {
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
