const HTTP = new WeakMap()

export default class RoomController {
  constructor ($window, $state, $stateParams, Room, RoomAccount, $http, SearchService) {
    this.store = $window.localStorage
    this.$state = $state
    this.$stateParams = $stateParams
    this.Room = Room
    this.RoomAccount = RoomAccount
    HTTP.set(this, $http)
    this.SearchService = SearchService
    this.search_input = ''
    this.search_result = []
    this.init()
  }

  searchTrack () {
    console.log(this.search_input)
    let promise = this.SearchService.searchTrack(this.search_input)
    promise.then((res) => {
      this.search_result = []
      this.search_result.push(res.results)
      console.log(this.search_result)
    })
  }

  init () {
    this.newAccount = {
      username: ''
    }
    this.dj = false

    this.token = this.store.getItem('token')
    if (this.token) {
      this.RoomAccount.get({ room_id: this.$stateParams.id, token: this.token }, account => {
        this.account = account
        this.dj = !!account.pivot.dj
      })
    }

    this.loadRoom()
  }

  loadRoom () {
    this.Room.get({ id: this.$stateParams.id }, room => {
      this.room = room
    })
  }

  createAccount () {
    this.RoomAccount.save({ room_id: this.$stateParams.id }, this.newAccount, account => {
      this.account = account
      this.token = account.token
      this.store.setItem('token', account.token)
    }, response => {
      this.errors = response.data
    })
  }

  becomeDJ () {
    this.RoomAccount.update({
      room_id: this.$stateParams.id
    }, {
      token: this.token,
      username: 'username',
      dj: true
    }, () => {
      this.dj = true
    })
  }

  leave () {
    this.store.removeItem('token')
    this.$state.go('home')
  }

  changeMusic () {
    this.music = {ratio: 0.8, artist: 'kjbkb', album: 'aaa', url: 'http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3'}
  }
}

RoomController.$inject = ['$window', '$state', '$stateParams', 'Room', 'RoomAccount', '$http', 'SearchService']
