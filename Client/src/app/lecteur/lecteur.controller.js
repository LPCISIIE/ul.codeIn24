
export default class LecteurController {

  constructor ($scope) {
    this.$scope = $scope
    let self = this
    let elem = {
      miniLecteur: $('#miniLecteur'),
      musique: $('#musique'),
      playButton: $('#buttonPlay'),
      muteButton: $('#buttonMute'),
      progress: $('#progress'),
      progressBar: $('#progressBar'),
      volume: $('#volume'),
      volumeBar: $('#volumeBar'),
      control: $('#control'),
      miniInfo: $('#miniInfo'),
      picture: $('#picture'),
      volumeSlider: $('#volumeSlider')
    }

    elem.volume.on('move', function (event) {
      self.changeVolume(self.seek(event, this))
    })
    elem.volume.on('click', function (event) {
      let ratio = self.seek(event, this)
      self.changeVolume(ratio)
    })
    elem.muteButton.on('click', function (event) {
      self.muter()
    })

    self.muter = function () {
      if (elem.musique[0].volume === 0) {
        elem.musique[0].volume = self.restoreValue / elem.volume.width()
        self.changeVolume(self.restoreValue / elem.volume.width())
      } else {
        console.log(elem.volumeBar.width())
        self.restoreValue = elem.volumeBar.width()
        self.changeVolume(0)

        elem.volumeBar.css('width', 0)
        elem.muteButton.css('backgroundImage', 'url(Ressources/Images/mute.png)')
      }
    }
    self.changeVolume = function (ratio) {
      if (ratio === 0) {
        elem.muteButton.addClass('mute')
      } else {
        elem.muteButton.removeClass('mute')
      }
      elem.volumeBar.css('width', ratio * 100 + '%')
      elem.musique[0].volume = ratio
    }

    self.timer = () => {
      let percent = (elem.musique[0].currentTime * 100) / elem.musique[0].duration
      percent += '%'
      elem.progressBar.width(percent)
    }

    self.play = (mp3) => {
      elem.musique.attr('src', mp3.url)
      setTimeout(function () {
        var currentTime = mp3.ratio * elem.musique[0].duration
        if (currentTime < elem.musique[0].duration) {
          elem.musique[0].currentTime = currentTime
        }
        elem.musique[0].play()
      }, 1000)
    }

    self.seek = function (e, objet) {
      var width = (e.pageX - 137) - objet.offsetLeft
      var ratio = (width / objet.offsetWidth)
      if (ratio < 0) {
        ratio = 0
      } else if (ratio > 1) {
        ratio = 1
      }
      console.log(ratio)
      return ratio
    }
    $scope.artist = 1
    $scope.playlist = {a: 'lknkln'}
    $scope.refresh = (mp3) => {
      $scope.artist = mp3.artist
      $scope.album = mp3.album
      this.url = mp3.url
      self.play(mp3)
    }
    setInterval(() => {
      self.timer()
    }, 200)
    $scope.$watch('Room.music', (value) => {
      if (value) {
        $scope.refresh(value)
      }
    })
  }
}

LecteurController.$inject = ['$scope']
