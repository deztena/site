import $ from 'jquery'
import anime from 'animejs'
import {once} from "lodash";


const renderAnimeSlider = () => {
  function init() {
    const root = $('.anime-slider')
    const track = $('.anime-slider_track')
    const slides = $('.anime-slider_slide')
    const textBoundary = $('.anime-slider_slide-text-boundary')

    let inited = false

    let oldSlide = null
    let currentSlide = null

    const spacing = 100
    const slideWidth = 600
    const activeSlideWidth = 700

    function update(currentIndex = 1) {
      const rootCenter = root.width() / 2

      oldSlide = currentSlide
      currentSlide = slides.eq(currentIndex)

      const currentSlideCenter = activeSlideWidth / 2
      const currentSlidePosition = rootCenter - currentSlideCenter

      function getWords() {
        return textBoundary.children('span')
      }

      function setText() {
        textBoundary.html(currentSlide.children('.anime-slider_slide-text').text().trim().split('').map(text => `<span>${text}</span>`).join('').replaceAll(' ', '&nbsp;'))
        return getWords()
      }

      console.log(oldSlide, currentSlide)

      root.height(activeSlideWidth)


      const showWords = once((callback) => {
        const words = setText()

        words.css('transform', `translateY(${80}px)`).css('opacity', 0)

        const wordTlIn = anime.timeline({
          duration: 500,
          easing: 'easeInCubic',
        })

        words.toArray().forEach((wordEl, index) => {
          wordTlIn.add({
            targets: wordEl,
            translateY: 0,
            opacity: {
              value: 1,
              delay: 100,
              duration: 500
            },
          }, 15 * index)
        })
      })

      const hideWords = once((callbak) => {
        const words = getWords()


        const wordTlOut = anime.timeline({
          easing: 'easeInCubic',
          duration: 500,
          update: function (anim) {
            if (anim.progress > 60) {
              callbak()
            }
          }
        })

        words.toArray().forEach((wordEl, index) => {
          wordTlOut.add({
            targets: wordEl,
            opacity: {
              value: 0,
              duration: 400
            },
            translateY: `-${80}`
          }, 15 * index)
        })
      })

      const toggleSlides = () => {
        slides.toArray().forEach((slide, index, arr) => {
          if (index > currentIndex) {
            anime({
              targets: slide,
              left: currentSlidePosition + ((activeSlideWidth + spacing) * (index - currentIndex)),
              easing: 'easeInOutSine'
            })
          } else if (index < currentIndex) {
            console.log(currentSlidePosition, activeSlideWidth - spacing, currentIndex - index)
            anime({
              targets: slide,
              left: (currentSlidePosition - 100) - ((activeSlideWidth - spacing) * (currentIndex - index)),
              easing: 'easeInOutSine'
            })
          }
        })
      }

      const showActive = () => {
        anime({
          targets: currentSlide[0],
          left: currentSlidePosition,
          width: activeSlideWidth,
          height: activeSlideWidth,
          easing: 'easeInOutSine',
          update: function (anim) {
            if (anim.progress > 50) {
              showWords()
            }
          }
        })

        if (oldSlide) {
          anime({
            targets: oldSlide[0],
            width: slideWidth,
            height: slideWidth,
            easing: 'easeInOutSine',
          })
        }
      }


      if (inited) {
        hideWords(once(() => {
          showActive()

          toggleSlides()
        }))
      } else {
        slides.css('left', currentSlidePosition)
        inited = true
        showActive()
        showWords()
        toggleSlides()
      }
    }

    slides.each(function (index) {
      $(this).on('click', () => {
        update(index)
      })
    })

    update()
  }

  setImmediate(init)
}

window.renderAnimeSlider = renderAnimeSlider
