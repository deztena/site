import $ from 'jquery'
import anime from 'animejs'
import throttle from "lodash/throttle";
import "./styles.scss";

const renderAnimeSlider = ({$root} = {}) => {
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

    const height = rootHeight + slideSize

    root.css('height', height)

    let lastTranslateX = 0

    const slidesMoveTL = anime.timeline({
      autoplay: false
    })

    slidesMoveTL.add({
      targets: track[0],
      duration: height,
      translateX: -(rootHeight + slideSize),
      easing: 'linear',
    })


    slides.toArray().forEach((wordEl, wordIndex) => {
      slidesMoveTL.add({
        targets: wordEl,
        duration: slideSize,
        width: slideSize + 200,
        height: slideSize + 200,
        easing: 'linear',
      }, (slideSize * wordIndex) + (200 * wordIndex))
    })
    slides.children('.anime-slider_slide-text').toArray().forEach((wordEl, wordIndex) => {
      slidesMoveTL.add({
        targets: wordEl,
        duration: slideSize,
        easing: 'linear',
        update: (anim) => {
          wordEl.style.filter = 'blur(' + 30 * (100 - anim.progress) / 100 + 'px)'
        }
      }, (slideSize * wordIndex) * 1.2)
    })

    function update() {
      const topOffset = root[0].getBoundingClientRect().top

      lastTranslateX = topOffset > 0 ? 0 : topOffset

      if (lastTranslateX > (-rootHeight)) {
        slidesMoveTL.seek(height * (Math.abs((lastTranslateX * 100) / rootHeight) / 100))
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
    update()

    $(window).on('scroll', throttle(e => {
      update()
    }, 0))
  }

  setImmediate(init)
}

window.renderAnimeSlider2 = renderAnimeSlider

export default renderAnimeSlider
