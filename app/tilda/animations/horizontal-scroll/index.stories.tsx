import type { Meta } from '@storybook/react';
import renderAnimeSlider from './index'
import {FC, useEffect} from "react";
import $ from "jquery";
import SmoothScroll from "../smooth-scroll";


export const Example: FC = props => {
  useEffect(() => {
    renderAnimeSlider({
      ...props,
      $root: $('.anime-slider'),
    })
  })
  useEffect(() => {
    SmoothScroll({
      // Время скролла 400 = 0.4 секунды
      animationTime: 800,
      // Размер шага в пикселях
      // Ускорение
      accelerationDelta: 30,
      // Максимальное ускорение
      accelerationMax: 2,

      // Поддержка клавиатуры
      keyboardSupport: true,
      // Шаг скролла стрелками на клавиатуре в пикселях
      arrowScroll: 50,

      // Pulse (less tweakable)
      // ratio of "tail" to "acceleration"
      pulseAlgorithm: true,
      pulseScale: 4,
      pulseNormalize: 1,

      // Поддержка тачпада
      touchpadSupport: true,
    })
  }, [])

  return (
    <div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"
              integrity="sha256-huW7yWl7tNfP7lGk46XE+Sp0nCotjzYodhVKlwaNeco=" crossOrigin="anonymous"></script>
      <div className="anime-slider">
        <div className="anime-slider_view">
          <div className="anime-slider_track">
            <div className="anime-slider_slide">
              <div className="anime-slider_slide-text">
                Ты пидор
              </div>
            </div>
            <div className="anime-slider_slide">
              <div className="anime-slider_slide-text">
                Ты пидор
              </div>
            </div>
            <div className="anime-slider_slide">
              <div className="anime-slider_slide-text">
                ПИДОР
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="anime-slider_example">
        <div className="anime-slider_slide-text">
        </div>
      </div>
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'Tilda/Animations/HorizontalScroll',
  component: Example,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
};

export default meta;

