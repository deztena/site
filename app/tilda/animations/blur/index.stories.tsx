import type { Meta } from '@storybook/react';
import renderAnimeBlur from './index'
import {useEffect} from "react";
import $ from "jquery";


export const Example = () => {

  useEffect(() => {
    renderAnimeBlur({
      $target: $('.anime-blur'),
    })
  }, [])

  return (
    <>
      <div className="screen" id="blur-svg-screen">
        <div className="screen__content">
        </div>
      </div>
      <div className="screen" id="blur-svg-screen">
        <div className="screen__content">
          <div className="anime-svg_wrapper" style={{
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1 1 100%'
          }}>
            <p className="anime-blur">asdasd</p>
            <p className="anime-blur">asdasd</p>
            <p className="anime-blur">asdasd</p>
            <p className="anime-blur">asdasd</p>
            <p className="anime-blur">asdasd</p>
          </div>
        </div>
      </div>
    </>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'Tilda/Animations/Blur',
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

