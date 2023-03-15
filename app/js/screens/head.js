import '../../style/screens/head.scss'
import Head  from '../../html/screens/head.twig'

function renderScreenHead() {
  document.write(Head())
}

window.renderScreenHead = renderScreenHead