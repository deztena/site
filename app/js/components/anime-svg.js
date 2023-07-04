import $ from 'jquery'
import anime from 'animejs'
import {once} from "lodash";


const renderAnimeSvg= () => {
  function init() {
    const svg = $('.anime-svg_svg')

    function update() {
      anime({
        targets: '.anime-svg_svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
      });

    }

    update()
  }

  setImmediate(init)
}

window.renderAnimeSvg = renderAnimeSvg
