const HTTP = new WeakMap()

export default class SearchController {
  constructor ($http, SearchService) {
    HTTP.set(this, $http)

    this.SearchService = SearchService
    this.search_input = ''
    this.search_result = []
  }

  getMusicInfos () {
    // on récupère les infos de la musique voulue
  }

  searchTrack () {
    console.log(this.search_input)
    let promise = this.SearchService.searchTrack()
    promise.then((res) => {
      this.search_result = res
      console.log(this.search_result)
    })
  }
}

SearchController.$inject = ['$http', 'SearchService']
