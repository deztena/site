import $ from 'jquery'
import anime from 'animejs'
import {once} from "lodash";
import throttle from "lodash/throttle";


const renderAnimeSvg = ({
                         duration = 1500,
                         target,
                         offset = 0,
                       }) => {
  function init() {
    const $target = $(`${target} svg`)
    let isComplete = false

    $target.css('opacity', '0')

    function update() {

      if (!isComplete && (($target[0].getBoundingClientRect().top - window.innerHeight) - offset) <= 0) {
        $target.css('opacity', '1')

        anime({
          targets: $target.children('path').toArray(),
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
