import type { Meta } from '@storybook/react';
import renderAnimeSvg from './index'
import {useEffect} from "react";


export const Example = () => {

  useEffect(() => {
    renderAnimeSvg({
      target: '#anime-svg'
    })
  }, [])

  return (
    <>
      <div className="screen" id="blur-svg-screen">
        <div className="screen__content">
        </div>
      </div>
      <div className="screen" id="anime-svg">
        <div className="screen__content">
          <div className="anime-svg_wrapper" style={{margin: '0 auto'}}>
            <svg className="anime-svg_svg" width="773" height="335" viewBox="0 0 773 335" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M153.608 316.929C153.608 316.929 282.187 67.8608 291.968 26.7563C301.75 -14.3482 53.0279 265.678 44.707 278.495C36.3862 291.313 95.4199 257.53 95.3046 238.832C95.1893 220.134 11.6159 240.331 1.14276 252.649C-9.33035 264.967 559.715 239.812 632.738 273.883"
                stroke="#453E39" stroke-miterlimit="10" stroke-linecap="round"/>
              <path
                d="M269.542 171.961C256.091 196.347 273.213 202.458 306.823 174.401C346.967 140.945 294.87 108.968 254.726 200.036C214.813 290.585 350.176 202.265 386.515 144.711"
                stroke="#453E39" stroke-miterlimit="10" stroke-linecap="round"/>
              <path
                d="M414.955 161.698C414.955 161.698 447.797 131.72 442.916 120.497C438.034 109.275 393.817 119.633 383.132 152.743C372.448 185.853 449.757 276.153 330.613 293.659C243.369 306.477 426.908 226.612 499.72 168.751"
                stroke="#453E39" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M403.002 334.224C403.002 334.224 548.819 85.6946 561.963 60.7129" stroke="#453E39"
                    stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M405.654 90.0558C405.654 90.0558 716.004 69.9935 746.751 86.6544" stroke="#453E39"
                    stroke-miterlimit="10" stroke-linecap="round"/>
              <path
                d="M540.902 184.331C540.902 184.331 655.164 61.3442 668.923 16.4348C682.682 -28.4746 608.333 20.2781 525.451 220.132C514.555 246.459 542.42 210.274 588.54 187.214C634.66 164.154 601.031 206.104 608.083 211.869C615.136 217.634 688.14 184.446 706.088 169.823C724.037 155.199 719.847 136.289 697.114 147.493C654.991 168.266 585.657 288.736 776.633 172.225"
                stroke="#453E39" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M703.629 296.519C703.629 296.519 857.074 36.2481 865.049 18.4727" stroke="#453E39"
                    stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M703.629 55.7936C703.629 55.7936 1019.21 37.8645 1043.55 51.1048" stroke="#453E39"
                    stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: 'Tilda/Animations/Svg',
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

