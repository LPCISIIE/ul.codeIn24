
export default class RoomsController {
  constructor (Room) {
    Room.query(rooms => {
      this.rooms = rooms
    })
  }
}

RoomsController.$inject = ['Room']
