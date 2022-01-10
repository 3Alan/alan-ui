import { render } from '@testing-library/react';
import Upload from '../index';

// TODO: 测试待补充
describe('Upload', () => {
  it('render', () => {
    render(<Upload fileList={[{ name: 'test', url: '' }]} />);
  });

  it('render with text list', () => {
    render(<Upload fileList={[{ name: 'test', url: '' }]} listType="text" />);
  });
});
