import $ from 'jquery'
import '../../style/components/dropdown.scss'
import Dropdown from '../../html/components/dropdown.twig'
import uniqueId from "lodash/uniqueId";

const renderDropdown = ({ title, content, renderTo }) => {
    const id = uniqueId('dropdown-')

    const render = () => Dropdown({
        id,
        title,
        content
    })


    if (renderTo) {
        renderTo.html(render())
    } else {
        document.write(render())
    }

    setImmediate(() => {
        const dropdown = $(`#${id}`)

        dropdown.find('.d-dropdown__content').hide()
        dropdown.find('.d-dropdown__title').on('click', function () {
            const parent = $(this).parents('.d-dropdown')

            if (!$(this).hasClass('d-dropdown__title_opened')) {
                parent.find('.d-dropdown__underline').hide()
                parent.find('.d-dropdown__content').show()
                $(this).addClass('d-dropdown__title_opened')
            } else {
                parent.find('.d-dropdown__underline').show()
                parent.find('.d-dropdown__content').hide()
                $(this).removeClass('d-dropdown__title_opened')
            }
        })
    })
}

window.renderDropdowm = renderDropdown
