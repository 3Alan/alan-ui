import { ComponentStory } from '@storybook/react';
import Upload from '../upload';

export default {
  title: 'Components/Upload',
  component: Upload,
  argTypes: {
    placement: { control: false }
  }
};
const Template: ComponentStory<typeof Upload> = (args) => (
  <div style={{ padding: 40, width: 300, margin: 'auto' }}>
    <Upload />
  </div>
);

export const upload = Template.bind({});
upload.args = {};
