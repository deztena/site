import '../../style/layouts/header.scss'
import Header  from '../../html/layouts/header.twig'
import $ from "jquery";

function renderHeader({ ready }, root) {
  root.before($('<div>', { class: 'header', html: Header()})).remove()

  if (ready) {
    setImmediate(() => {
      ready()
    })
  }
}

export default renderHeader