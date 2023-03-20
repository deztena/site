import $ from 'jquery'
import '../style/misc/index.scss'
import '../style/screens/_common.scss'
import '../style/components/_common.scss'
import uniqueId from "lodash/uniqueId";

window.$ = $
window.jquery = $

const makeRoot = (args, component) => {
    const rootId = uniqueId('root-')

    document.write(`<div id="${rootId}"></div>`)
    setImmediate(() => {
        component($(`#${rootId}`))
    })
}

window.renderDropdown = args => {
    makeRoot(args, root => import('./components/dropdown').then(component => component.default(args, root)))
}

window.renderBgText = args => {
    makeRoot(args, root => import('./components/bg-text').then(component => component.default(args, root)))

}

window.initBurgerMenu = args => {
    import('./components/burger-menu').then(component => component.default(args))
}

window.renderHeader = args => {
    makeRoot(args, root => import('./layouts/header').then(component => component.default(args, root)))
}

window.renderScreenHead = args => {
    makeRoot(args, root => import('./screens/head').then(component => component.default(args, root)))
}