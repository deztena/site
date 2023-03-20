import $ from 'jquery'
import '../../style/components/dropdown.scss'
import Dropdown from '../../html/components/dropdown.twig'

const attachDropdowns = () => {
    const dropdowns = $('.dropdown')
    dropdowns.find('.dropdown__content').hide()

    dropdowns.find('.dropdown__trigger')
        .each(function (index) {
        $(this).on('click', () => {
            $(this).hide().parents('.dropdown').find('.dropdown__content').show()
        })
    })
}


const renderDropdown = ({triggerImage, contentImage, renderTo }) => {
    const render = () => Dropdown({
        triggerImage, contentImage
    })


    if (renderTo) {
        renderTo.html(render())
    } else {
        document.write(Dropdown({
            triggerImage, contentImage
        }))
    }

    setImmediate(() => {
        attachDropdowns()
    })
}


export default renderDropdown

$(document).ready(() => {
    attachDropdowns()
})