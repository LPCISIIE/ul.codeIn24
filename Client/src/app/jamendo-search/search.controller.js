const HTTP = new WeakMap()

export default class SearchController {
  constructor ($http, SearchService, $scope) {
    HTTP.set(this, $http)

    this.display_options = 'hidden'
    this.SearchService = SearchService
    this.search_input = ''
    this.search_result = []

    // on gère les valeurs des groupements de boutons
    $scope.option_search = [{
      value: '1',
      label: 'nom'
    }, {
      value: '2',
      label: 'nom d\'artiste'
    }, {
      value: '3',
      label: 'nom d\'album'
    }]
  }

  getMusicInfos () {
    // on récupère les infos de la musique voulue
  }

  searchTrack (OptionSearch) {
    console.log(this.search_input)
    let promise = null
    if (OptionSearch === '1') {
      promise = this.SearchService.searchByName(this.search_input)
    } else if (OptionSearch === '2') {
      promise = this.SearchService.searchByArtist(this.search_input)
    } else if (OptionSearch === '3') {
      promise = this.SearchService.searchByAlbum(this.search_input)
    } else {
      promise = this.SearchService.searchTrack(this.search_input)
    }
    promise.then((res) => {
      this.search_result.push(res.results)
      console.log(this.search_result)
    })
  }

  displayOptions () {
    if (this.display_options === 'hidden') {
      this.display_options = 'show'
    } else {
      this.display_options = 'hidden'
    }
  }

}

SearchController.$inject = ['$http', 'SearchService', '$scope']
