import anime from 'animejs'
import $ from "jquery";
import throttle from "lodash/throttle";


const renderAnimeBlur = ({
                           duration = 1000,
                           partsShowOffset = 700,
                           $target,
                           offset = 0,
                         } = {}) => {
  function init() {
    const tl = anime.timeline({
      duration,
      autoplay: false
    })
    let isComplete = false

    $target.css('opacity', 0)

    function update() {
      if (!isComplete && (($target[0].getBoundingClientRect().top - window.innerHeight) - offset) <= 0) {
        $target.each(function (index) {
          tl.add({
            targets: this,
            translateY: [400, 0],
            opacity: [0, 1],
            easing: 'easeOutCirc',
            update: (anim) => {
              this.style.filter = 'blur(' + 30 * (100 - anim.progress) / 100 + 'px)'
            }
          }, `-=${index === 0 ? 0 : partsShowOffset}`)
        })

        isComplete = true

        tl.play()
      }
    }

    update()

    $(window).on('scroll', throttle(e => {
      update()
    }, 100))
  }

  setImmediate(init)
}

export default renderAnimeBlur

window.renderAnimeBlur = renderAnimeBlur
