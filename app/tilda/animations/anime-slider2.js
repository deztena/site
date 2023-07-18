import $ from 'jquery'
import anime from 'animejs'
import throttle from "lodash/throttle";
import "../../style/components/anime-slider2.scss";


const renderAnimeSlider = ({ $root } = {}) => {
  function init() {
    const slideExample = $('.anime-slider_example')
    const root = $root ?? $('.anime-slider')
    const view = $('.anime-slider_view')
    const track = $('.anime-slider_track')
    const slides = $('.anime-slider_slide')
    const activeSlideScale = 200
    let slideSize = 0
    let activeSlideSize = 0
    let rootHeight = 0
    let rootCenter = root.width() / 2

    slideSize = slideExample.eq(0).height()
    rootHeight = track.width()

    const leftBorder = rootCenter - slideSize
    const rightBorder = root.width()

    slides.each(function () {
      const word = $(this).children('.anime-slider_slide-text')

      word.html(word.text().trim().split('').map(text => `<span>${text}</span>`).join('').replaceAll(' ', '&nbsp;'))
    })

    root.css('height', rootHeight + slideSize)

    let lastTranslateX = 0
    let prevAnimation = null

    function update() {
      const topOffset = root[0].getBoundingClientRect().top


      lastTranslateX = topOffset > 0 ? 0 : topOffset

      if (lastTranslateX > (-rootHeight)) {

        prevAnimation = anime({
          targets: track[0],
          translateX: lastTranslateX,
          duration: 1000,
          easing: 'easeOutQuint'
        })
      }
    }

    let prevAnimWords = slides.toArray().fill(null)
    let prevAnimSize = slides.toArray().fill(null)

    function updateWords() {

      slides.each(function (index) {
        const slide = $(this)
        const word = $(this).children('.anime-slider_slide-text')
        const slideLeft = slide[0].getBoundingClientRect().left
        const center = slideLeft + (slideSize / 2)

        const p = leftBorder - center
        const c = Math.abs(p > 0 ? 0 : p) / (rootCenter - leftBorder)
        const r = c > 2 ? 0 : c
        const d = (r > 1 ? 2 - r : r).toFixed(1)
        const v = d > 0.8 ? 1 : d

        if ((prevAnimWords[index] && prevAnimWords[index].completed || !prevAnimWords[index])) {
          prevAnimWords[index] = anime.timeline({
            duration: 200,
            easing: 'linear',
          })
          word.children('span').toArray().forEach((wordEl, wordIndex) => {
            let translateY = v > 0.5 ? 0 : 80

            prevAnimWords[index].add({
              targets: wordEl,
              easing: 'linear',
              translateY: translateY,
              complete() {

              }
            }, 20 * wordIndex)
          })
        }

        prevAnimSize[index] = anime({
          targets: slide[0],
          width: slideSize + (activeSlideScale * v),
          height: slideSize + (activeSlideScale * v),
          duration: 1000,
          easing: 'easeOutQuint'
        })
      })
    }


    $(window).scroll(throttle(e => {
      if (root[0].getBoundingClientRect().top < 1 && root[0].getBoundingClientRect().bottom > 0) {
        view.css('transform', `translateY(${root[0].getBoundingClientRect().top * -1}px)`)
      }
    }))

    $(window).scroll(throttle(e => {
      update()
    }, 100))
    $(window).scroll(throttle(e => {
      updateWords()
    }, 50))
    update()
  }

  setImmediate(init)
}

window.renderAnimeSlider2 = renderAnimeSlider
