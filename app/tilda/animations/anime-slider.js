import $ from 'jquery'
import anime from 'animejs'
import {once} from "lodash";


const renderAnimeSlider = () => {
  function init() {
    const root = $('.anime-slider')
    const track = $('.anime-slider_track')
    const slides = $('.anime-slider_slide')
    const textBoundary = $('.anime-slider_slide-text-boundary')
    const spacing = 100
    const activeSlideScale = 100
    const slidesCount = slides.toArray().length
    let slideSize = 0
    let activeSlideSize = 0
    let currentIndex = 0
    let isLastSlide = false
    let isFirstSlide = false
    let rootHeight = 0
    let oldSlide = null
    let currentSlide = null
    let inited = false
    let rootCenter = root.width() / 2

    let isAnimationPending = false

    slideSize = slides.eq(0).height()
    activeSlideSize = slideSize + activeSlideScale
    rootHeight = ((slidesCount) * slideSize) + activeSlideSize + (spacing + slidesCount)

    root.css('height', rootHeight)

    function update(_currentIndex) {
      if (_currentIndex === currentIndex) {
        return
      }


      currentIndex = _currentIndex ?? currentIndex
      isLastSlide = (slides.toArray().length - 1) === currentIndex
      isFirstSlide = _currentIndex === 0
      oldSlide = currentSlide
      currentSlide = slides.eq(currentIndex)


      isAnimationPending = true

      const currentSlideCenter = activeSlideSize / 2
      const currentSlidePosition = rootCenter - currentSlideCenter

      function getWords() {
        return textBoundary.children('span')
      }

      function setText() {
        textBoundary.html(currentSlide.children('.anime-slider_slide-text').text().trim().split('').map(text => `<span>${text}</span>`).join('').replaceAll(' ', '&nbsp;'))
        return getWords()
      }

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
              left: currentSlidePosition + ((activeSlideSize + spacing) * (index - currentIndex)),
              easing: 'easeInOutSine'
            })
          } else if (index < currentIndex) {
            anime({
              targets: slide,
              left: (currentSlidePosition - 100) - ((activeSlideSize - spacing) * (currentIndex - index)),
              easing: 'easeInOutSine'
            })
          }
        })
      }

      const showActive = () => {
        anime({
          targets: currentSlide[0],
          left: currentSlidePosition,
          width: activeSlideSize,
          height: activeSlideSize,
          easing: 'easeInOutSine',
          update: function (anim) {
            if (anim.progress > 50) {
              showWords()
            }
          },
          complete: function (anim) {
            isAnimationPending = false
          }
        })

        if (oldSlide) {
          anime({
            targets: oldSlide[0],
            width: slideSize,
            height: slideSize,
            easing: 'easeInOutSine',
          })
        }
      }


      if (inited) {
        isAnimationPending = true

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

    let lastScrollPosition = window.scrollY

    $(window).scroll(e => {
      console.log(window.scrollY > lastScrollPosition)
      lastScrollPosition = window.scrollY
    })
    update()
  }

  setImmediate(init)
}

window.renderAnimeSlider = renderAnimeSlider
