const HTTP = new WeakMap()

export default class RoomController {
  constructor ($window, $state, $stateParams, Room, RoomAccount, $http, SearchService, API) {
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
    this.API = API
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

  sendToPlaylist (r) {
    $.post(this.API.url + '/rooms/' + this.room.id + '/musics', {token: this.token, title: r.name, artist: r.artist_name, album: r.album_name, url: r.audio}, function (data) {
      console.log(data)
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
      console.log(this.room)
      if (room.account_id === null || room.music_id === null) {
        $.post(this.API.url + '/rooms/' + this.room.id + '/musics/next', {token: this.token}, function (data) {
          console.log(data)
        })
      }
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
      username: this.account.username,
      dj: true
    }, () => {
      this.dj = true
    })
  }

  leave () {
    this.store.removeItem('token')
    this.$state.go('home')
  }

  changeMusic (piste) {
    this.music = {ratio: 0, artist: 'kjbkb', album: 'aaa', url: 'http://www.stephaniequinn.com/Music/Allegro%20from%20Duet%20in%20C%20Major.mp3'}
  }
}

RoomController.$inject = ['$window', '$state', '$stateParams', 'Room', 'RoomAccount', '$http', 'SearchService', 'API']
