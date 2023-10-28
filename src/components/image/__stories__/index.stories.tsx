import { ComponentStory } from '@storybook/react';
import Image from '../index';
import './index.scss';

export default {
  title: 'Components/Image',
  component: Image
};

export const image: ComponentStory<typeof Image> = () => {
  return (
    <>
      <Image width={500} height={320} alt="1" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=1" />
      <Image width={500} height={320} alt="2" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=2" />
      <Image lazy width={500} height={320} alt="3" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=3" />
      <Image lazy width={500} height={320} alt="4" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=4" />
      <Image lazy width={500} height={320} alt="5" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=5" />
      <Image lazy width={500} height={320} alt="6" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=6" />
      <Image lazy width={500} height={320} alt="7" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=7" />
      <Image lazy width={500} height={320} alt="8" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=8" />
      <Image lazy width={500} height={320} alt="9" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=9" />
      <Image lazy width={500} height={320} alt="10" src="https://dummyimage.com/500x320/4ca5e6/fff.png&text=10" />
    </>
  );
};
