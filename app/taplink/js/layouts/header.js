import '../../style/layouts/header.scss'
import Header  from '../../html/layouts/header.twig'

function renderHeader() {
  document.write(Header())
}

window.renderHeader = renderHeader