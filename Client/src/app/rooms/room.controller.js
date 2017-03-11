const HTTP = new WeakMap()

export default class RoomController {
  constructor ($window, $interval, $state, $stateParams, Room, RoomAccount, RoomMusic, $http, SearchService, API) {
    this.store = $window.localStorage
    this.$interval = $interval
    this.$state = $state
    this.$stateParams = $stateParams
    this.Room = Room
    this.RoomAccount = RoomAccount
    this.RoomMusic = RoomMusic
    HTTP.set(this, $http)
    this.SearchService = SearchService
    this.search_input = ''
    this.search_result = []
    this.init()
    this.API = API
  }

  searchTrack () {
    let promise = this.SearchService.searchTrack(this.search_input)
    promise.then((res) => {
      this.search_result = []
      this.search_result.push(res.results)
    })
  }

  sendToPlaylist (r) {
    $.post(this.API.url + '/rooms/' + this.room.id + '/musics', {token: this.token, title: r.name, artist: r.artist_name, album: r.album_name, url: r.audio, album_image: r.album_image}, function (data) {
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

    /* let interval = this.$interval(() => {
      if (!this.room.account_id || !this.room.music_id) {
        this.RoomMusic.next({ room_id: this.$stateParams.id }, room => {
          this.room = room
        })
      } else {
        this.$interval.cancel(interval)
      }
    }, 2000) */
  }

  loadRoom () {
    this.Room.get({ id: this.$stateParams.id }, room => {
      this.room = room
      if (room.account_id === null || room.music_id === null) {
        this.refresh()
      }

      if (room.music) {
        this.changeMusic(this.room.music)
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
    // console.log(piste)
    this.music = {
      ratio: 0.99,
      artist: piste.artist,
      album: piste.album,
      url: piste.url,
      image: piste.album_image
    }
  }

  refresh () {
    this.RoomMusic.next({ room_id: this.$stateParams.id }, room => {
      this.room = room
      if (room.music) {
        this.changeMusic(this.room.music)
      }
    })
  }
}

RoomController.$inject = ['$window', '$interval', '$state', '$stateParams', 'Room', 'RoomAccount', 'RoomMusic', '$http', 'SearchService', 'API']
