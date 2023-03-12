import $ from 'jquery'
import closeIcon from '../icons/close'
import '../../style/components/index.scss'


function handleOpen(wrapper) {
  wrapper.show({
    duration: 200,
    easing: '',
    start() {
      wrapper.children().css.opacity = 0
    },
    complete() {
      wrapper.children().animate({ opacity: 1 }, 200)
    }
  })
}

function handleClose(wrapper) {
  wrapper.children().animate({ opacity: 0 }, {
    duration: 100,
    complete() {
      wrapper.hide({
        duration: 200,
      })
    }
  })
}

function initBurgerMenu({ topLinks = [], bottomLinks = [], scrollEl = window }) {
  const wrapper = $('<div>', { class: 'burger-menu__wrapper'}).appendTo(document.body).hide()
  const closeHandler = () => handleClose(wrapper)
  const openHandler = () => handleOpen(wrapper)
  const scrollTo = (e, el) => {
    if (el) {
      e.stopPropagation()
      e.preventDefault()
      closeHandler()

      scrollEl.scrollTo({
        top: el.offset().top,
        behavior: 'smooth'
      })
    }
  }


  wrapper.append($('<div>', { class: 'burger-menu__content'}).append($('<div>', { class: 'burger-menu__content-wrapper'}).append(
    $('<div>', { class: 'burger-menu__row burger-menu__row_1'}).append(topLinks.map(link => $('<a>', {
      class: 'burger-menu__link', text: link.label, href: link.href}).on('click', e => scrollTo(e, link.scrollTo)))),
    $('<div>', { class: 'burger-menu__row burger-menu__row_2'}).append(bottomLinks.map(link => $('<a>', {
      class: 'burger-menu__link', text: link.label, href: link.href
    }).on('click', e => scrollTo(e, link.scrollTo))))
  )), closeIcon.attr('class', 'burger-menu__close-icon ' + closeIcon.attr('class')).on('click', closeHandler))

  return [
    openHandler,
    closeHandler
  ]
}

window.initBurgerMenu = initBurgerMenu