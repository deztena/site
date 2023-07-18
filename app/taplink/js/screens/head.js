import '../../style/screens/head.scss'
import Head  from '../../html/screens/head.twig'

function renderScreenHead({ renderTo } = {}) {
  renderTo?.parents('.section-main').addClass('section-main_reset')
  renderTo?.parents('.page-container').addClass('page-container_reset')
  renderTo?.parents('.block-html').addClass('block-html_reset')
  let images = []

  if (renderTo) {
    renderTo.append(Head())
  } else {
    document.write(Head())
  }

  const wrapper = renderTo ? renderTo : $(document)

  images = wrapper.find('.head-screen-photos__photo-wrapper').children()
  const start = () => {
    images.css('opacity', 0)

    $(images).eq(0).css('opacity', 1)
    $(images).eq(1).delay(300).animate({
      opacity: 0,
    }, {
      easing: 'linear',
      duration: 1,
    }).animate({
      opacity: 1,
    }, {
      easing: 'linear',
      duration: 1,
      complete: function showNext() {
        $(this).delay(300).animate({
          opacity: 0,
        }, {
          easing: 'linear',
          duration: 1,
          complete() {
            if (!$(this).next()[0]) {
              setTimeout(() => {
                start()
              }, 0)
            }
          }
        })

        $(this).next().delay(300).animate({
          opacity: 1,
        }, {
          easing: 'linear',
          duration: 1,
          complete: showNext
        })
      }
    })
  }

  start()
}

window.renderScreenHead = renderScreenHead