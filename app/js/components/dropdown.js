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

    function toggle(dropdown) {
        const title = dropdown.find('.d-dropdown__title')
        if (!title.hasClass('d-dropdown__title_opened')) {
            dropdown.find('.d-dropdown__underline').hide()
            dropdown.find('.d-dropdown__content').show()
            title.addClass('d-dropdown__title_opened');
            $('.d-dropdown').each(function () {
                if ($(this).children('.d-dropdown__title').hasClass('d-dropdown__title_opened') && this !== dropdown[0]) {
                    setImmediate(() => {
                        toggle($(this))
                    })
                }
            })
        } else {
            dropdown.find('.d-dropdown__underline').show()
            dropdown.find('.d-dropdown__content').hide()
            title.removeClass('d-dropdown__title_opened')
        }
    }

    setImmediate(() => {
        const dropdown = $(`#${id}`)

        dropdown.find('.d-dropdown__content').hide()
        dropdown.find('.d-dropdown__title').on('click', () => {
            toggle(dropdown)
        })
    })
}

window.renderDropdowm = renderDropdown
