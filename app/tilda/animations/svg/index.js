import $ from 'jquery'
import anime from 'animejs'
import throttle from "lodash/throttle";


const renderAnimeSvg = ({
                          duration = 1500,
                          $targetSvg,
                          showOffset = 0,
                          hideOffset = 0,
                        }) => {
  function init() {
    let prevY = window.scrollY
    let isPending = false
    let isShowed = false
    $targetSvg.css('opacity', '0')

    const lastAnimation = anime({
      targets: $targetSvg.children('path').toArray(),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',

      duration,
      begin: () => {
        isPending = true
      },
      complete: ()=>  {
        isPending = false
        },
      autoplay: false,
      delay: function (el, i) {
        return i * 250
      },
    })

    lastAnimation.reverse()


    function show() {
      lastAnimation.reverse()
      lastAnimation.restart()
    }

    function hide() {
      lastAnimation.reverse()
      lastAnimation.restart()
    }

    function update() {
      const topBorder = $targetSvg[0].getBoundingClientRect().top - window.innerHeight - showOffset
      const botBorder = $targetSvg[0].getBoundingClientRect().bottom - window.innerHeight - hideOffset

      if (!isPending) {
        if (
          topBorder <= 0
          && prevY < window.scrollY
          && !isShowed)
        {
          $targetSvg.css('opacity', '1')

          isShowed = true

          show()
        } else if (
          botBorder >= 0
          && prevY > window.scrollY
          && isShowed
        ) {
          isShowed = false

          hide()
        }
      }
    }


    update()


    $(window).on('scroll', throttle(e => {
      update()

      prevY = window.scrollY
    }, 0))
  }

  setImmediate(init)
}

window.renderAnimeSvg = renderAnimeSvg

export default renderAnimeSvg
