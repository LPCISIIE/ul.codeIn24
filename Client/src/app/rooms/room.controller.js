
export default class RoomController {
  constructor ($window, $state, $stateParams, Room, RoomAccount) {
    this.store = $window.localStorage
    this.$state = $state
    this.$stateParams = $stateParams
    this.Room = Room
    this.RoomAccount = RoomAccount

    this.init()
  }

  init () {
    this.newAccount = {
      username: ''
    }

    this.token = this.store.getItem('token')
    if (this.token) {
      this.RoomAccount.get({ room_id: this.$stateParams.id, token: this.token }, account => {
        this.account = account
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
      this.store.setItem('token', account.token)
    }, response => {
      this.errors = response.data
    })
  }

  becomeDJ () {
    this.RoomAccount.update({
      room_id: this.$stateParams.id
    }, {
      username: 'username',
      dj: true
    })
  }

  leave () {
    this.store.removeItem('token')
    this.$state.go('home')
  }
}

RoomController.$inject = ['$window', '$state', '$stateParams', 'Room', 'RoomAccount']
