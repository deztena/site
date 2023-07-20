import $ from 'jquery'
import anime from 'animejs'
import throttle from "lodash/throttle";


const renderAnimeSvg = ({
                          duration = 1500,
                          $targetSvg,
                          offset = 0,
                        }) => {
  function init() {
    let isComplete = false

    $targetSvg.css('opacity', '0')

    function update() {

      if (!isComplete && (($targetSvg[0].getBoundingClientRect().top - window.innerHeight) - offset) <= 0) {
        $targetSvg.css('opacity', '1')

        anime({
          targets: $targetSvg.children('path').toArray(),
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutSine',
          duration,
          delay: function(el, i) { return i * 250 },
        })

        isComplete = true
      }
    }

    update()

    $(window).on('scroll', throttle(e => {
      update()
    }, 100))
  }

  setImmediate(init)
}

window.renderAnimeSvg = renderAnimeSvg

export default renderAnimeSvg
