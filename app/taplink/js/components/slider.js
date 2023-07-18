import {Swiper} from 'swiper'
import  'swiper/swiper.min.css'

const renderSlider = (props) => {
    setImmediate(() => {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            autoHeight: true,
            ...props
        });
    })
}

export default renderSlider

window.renderSlider = renderSlider