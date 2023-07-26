import type { Meta } from '@storybook/react';
import {FC, useEffect} from "react";
import SmoothScroll from "./index";


export const Example: FC = () => {
  useEffect(() => {
    SmoothScroll({
      // Время скролла 400 = 0.4 секунды
      animationTime: 800,
      // Размер шага в пикселях
      stepSize: 75,

      // Дополнительные настройки:

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
    <div style={{ height: 4000}}>
    </div>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'Tilda/Animations/SmoothScroll',
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

