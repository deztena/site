import $ from 'jquery'
import uniqueId from 'lodash/uniqueId'
import '../../style/components/burger-menu.scss'
import BurgerMenu  from '../../html/components/burger-menu.twig'


function handleOpen(wrapper) {
  wrapper.show({
    duration: 200,
    easing: '',
    start() {
      wrapper.children().css.opacity = 0
    },
    complete() {
      wrapper.children().animate({opacity: 1}, 200)
    }
  })
}

function handleClose(wrapper) {
  wrapper.children().animate({opacity: 0}, {
    duration: 100,
    complete() {
      wrapper.hide({
        duration: 200,
      })
    }
  })
}

function initBurgerMenu({topLinks: _topLinks = [], bottomLinks: _bottomLinks = [], scrollEl = $(window)}) {
  const topLinks = _topLinks.map(link => ({
    ...link,
    clickHandler: uniqueId('burgerClickHandler')
  }))
  const bottomLinks = _bottomLinks.map(link => ({
    ...link,
    clickHandler: uniqueId('burgerClickHandler')
  }))
  const root = $(document.body)
  const wrapperId = uniqueId('burger-menu-wrapper')
  const burgerCloseBtnHandlerName = uniqueId('burgerCloseHandler')

  root.append(BurgerMenu({
    topLinks,
    bottomLinks,
    wrapperId,
    burgerCloseBtnHandlerName
  }))

  const wrapper = root.find(`#${wrapperId}`).hide()

  const closeHandler = () => handleClose(wrapper)
  const openHandler = () => handleOpen(wrapper)
  const scrollTo = (e, el) => {
    if (el) {
      e.stopPropagation()
      e.preventDefault()
      closeHandler()

      scrollEl[0].scrollTo({
        top: (scrollEl.scrollTop() + el.offset().top) - 25,
        behavior: 'smooth'
      })
    }
  }

  [...topLinks, ...bottomLinks].forEach(link => {
    window[link.clickHandler] = e => scrollTo(e, link.scrollTo)
  })

  window[burgerCloseBtnHandlerName] = closeHandler

  return [
    openHandler,
    closeHandler
  ]
}

window.initBurgerMenu = initBurgerMenu