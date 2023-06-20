import '../../style/screens/services.scss'
import Services  from '../../html/screens/services.twig'
import uniqueId from "lodash/uniqueId";
import shuffle from "lodash/shuffle";

function renderScreenServices({ renderTo, words } = {}) {
  const id = uniqueId('screen-services')

  renderTo?.parents('.section-main').addClass('section-main_reset')
  renderTo?.parents('.page-container').addClass('page-container_reset')
  renderTo?.parents('.block-html').addClass('block-html_reset')

  if (renderTo) {
    renderTo.append(Services({
      words,
      id
    }))
  } else {
    document.write(Services({
      words,
      id
    }))
  }

  const animate = (img, delayIn = 0, delayOut = 0) => {
    img.delay(delayIn).animate({
      opacity: 1
    }, {
      duration: 1,
      easing: 'linear',
      complete() {
        $(this).delay(delayOut).animate({
          opacity: 0
        }, {
          duration: 1,
          easing: 'linear',
          complete() {
            animate(img, delayIn, delayOut)
          }
        })
      }
    })
  }

  setImmediate(() => {
    const root = $(`#${id}`)
    const images = root.find('.screen-services__bg')
    const wordsElements = root.find('.screen-services__grid-item-word')
    images.eq(1).css('opacity', 0)

    animate(images.eq(1), 300, 300)

    setInterval(() => {
      const preparedWords = shuffle(words)

      wordsElements.each(function () {
        $(this).text('')
      })

      shuffle(new Array(9).fill(0).map((_, index) => index)).slice(0, 5).forEach(index => {
        wordsElements.eq(index).text(preparedWords[index])
      })
    }, 500)
  })
}

window.renderScreenServices = renderScreenServices