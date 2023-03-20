import '../../style/screens/head.scss'
import $ from 'jquery'
import Head from '../../html/screens/head.twig'

function _renderScreenHead({}, root) {
  root.parents('.section-main').addClass('section-main_reset')
  root.parents('.page-container').addClass('page-container_reset')
  root.parents('.block-html').addClass('block-html_reset')

  const start = (images) => {
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
                start(images)
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

  root.before($('<div>', { class: 'screen head-screen', html: Head()})).remove()

  setImmediate(() => {
    start(root.find('.head-screen-photos__photo-wrapper').children())
  })
}

export default _renderScreenHead