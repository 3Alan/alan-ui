import { ComponentStory } from '@storybook/react';
import { Button } from '../button';
import Upload, { UploadProps } from '../upload';

export default {
  title: 'Components/Upload',
  component: Upload,
  argTypes: {
    placement: { control: false }
  }
};

const Template: ComponentStory<typeof Upload> = (args) => {
  const beforeUpload = async (fileList: File[]) => {
    console.log(fileList);
    return await Promise.all(fileList.map((item) => Promise.resolve(new File([item], 'hello', { type: item.type }))));
  };

  return (
    <div style={{ padding: 40, width: 300, margin: 'auto' }}>
      <Upload multiple onChange={(e) => console.log(e)} beforeUpload={beforeUpload} {...args}>
        <Button>Upload</Button>
      </Upload>
    </div>
  );
};

export const textList = Template.bind({});
textList.args = {
  listType: 'text'
};

export const pictureList = (args: UploadProps) => {
  return (
    <div style={{ padding: 40, width: 300, margin: 'auto' }}>
      <Upload multiple onChange={(e) => console.log(e)} {...args} />
    </div>
  );
};
