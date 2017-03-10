
export default class LecteurController {

  constructor ($scope) {
    this.$scope = $scope
    let self = this
    this.miniLecteur = $('#miniLecteur')
    this.musique = $('#musique')
    this.playButton = $('#buttonPlay')
    this.muteButton = $('#buttonMute')
    this.progress = $('#progress')
    this.progressBar = $('#progressBar')
    this.volume = $('#volume')
    this.volumeBar = $('#volumeBar')
    this.control = $('#control')
    this.miniInfo = $('#miniInfo')
    this.picture = $('#picture')
    this.volumeSlider = $('#volumeSlider')

    this.volume.on('move', function (event) {
      self.changeVolume(self.seek(event, this))
      if (self.seek(event, this) === 0) {
        this.muteButton.addClass('mute')
      } else {
        this.muteButton.addClass('mute')
      }
    })
    this.volume.on('click', function (event) {
      let ratio = self.seek(event, this)
      self.changeVolume(ratio)
      if (self.seek(event, this.volume) === 0) {
        this.muteButton.addClass('mute')
      } else {
        this.muteButton.addClass('mute')
      }
    })
    this.changeVolume = function (ratio) {
      this.volumeBar.css('width', ratio * 100 + '%')
      this.musique[0].volume = ratio
    }

    this.changeProgression = function (ratio) {
      var currentTime = ratio * this.musique[0].duration
      if (currentTime < this.musique[0].duration) {
        this.musique[0].currentTime = currentTime
      }
    }

    this.seek = function (e, objet) {
      var width = e.pageX - objet.offsetLeft
      var ratio = (width / objet.offsetWidth)
      if (ratio < 0) {
        ratio = 0
      } else if (ratio > 1) {
        ratio = 1
      }
      console.log(ratio)
      return ratio
    }
    this.progress.on('move', (event) => {
      self.changeProgression(self.seek(event, this.progress))
    })
    this.progress.on('click', function (event) { self.changeProgression(self.seek(event, this)) })

    $scope.artist = 1
    $scope.playlist = {a: 'lknkln'}
    $scope.refresh = (mp3) => {
      $scope.artist = mp3.artist
      $scope.album = mp3.album
      this.url = mp3.url
      this.musique.attr('src', mp3.url)
      this.musique[0].play()
    }
  }
}

LecteurController.$inject = ['$scope']
