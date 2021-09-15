import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import Tabs, { TabPane } from '../index';

const mockChange = jest.fn();

const TabsTesterWithControl = () => {
  const [key, setKey] = useState('1');
  return (
    <Tabs activeKey={key} onChange={(k) => setKey(k)}>
      <TabPane title="pane1" tabKey="1">
        <div>pane 1 content</div>
        <p>It is a Tab component</p>
      </TabPane>
      <TabPane title="pane2" tabKey="2">
        <p>pane 2 content</p>
      </TabPane>
    </Tabs>
  );
};

describe('Tabs', () => {
  it('render correctly and tab click work well(uncontroled)', () => {
    const { getByTitle, getByTestId } = render(
      <Tabs defaultActiveKey="1" onChange={mockChange}>
        <TabPane title="pane1" tabKey="1">
          pane1 content
        </TabPane>
        <TabPane title="pane2" tabKey="2">
          pane2 content
        </TabPane>
      </Tabs>
    );

    expect(getByTitle('pane1')).toHaveClass('alan-tabs-nav-active');

    expect(getByTestId('pane-1')).toHaveClass('alan-tabs-pane-active');

    fireEvent.click(getByTitle('pane2'));
    expect(getByTitle('pane1')).not.toHaveClass('alan-tabs-nav-active');
    expect(getByTitle('pane2')).toHaveClass('alan-tabs-nav-active');

    expect(getByTestId('pane-1')).not.toHaveClass('alan-tabs-pane-active');
    expect(getByTestId('pane-2')).toHaveClass('alan-tabs-pane-active');

    expect(mockChange).toHaveBeenCalledWith('2');
  });

  it('test disabled item and not pass defaultActiveKey', () => {
    const { getByTitle } = render(
      <Tabs onChange={mockChange}>
        <TabPane title="pane1" tabKey="1">
          pane1 content
        </TabPane>
        <TabPane title="pane2" tabKey="2" disabled>
          pane1 content
        </TabPane>
      </Tabs>
    );

    expect(getByTitle('pane2')).toHaveClass('alan-tabs-nav-disabled');

    fireEvent.click(getByTitle('pane2'));
    expect(mockChange).not.toHaveBeenCalled();
  });

  it('pass other child element', () => {
    render(
      <Tabs>
        123
        <TabPane title="pane1" tabKey="1">
          pane1 content
        </TabPane>
      </Tabs>
    );
  });

  it('with controlled', () => {
    const { getByTitle, getByTestId } = render(<TabsTesterWithControl />);

    expect(getByTitle('pane1')).toHaveClass('alan-tabs-nav-active');

    expect(getByTestId('pane-1')).toHaveClass('alan-tabs-pane-active');

    fireEvent.click(getByTitle('pane2'));
    expect(getByTitle('pane1')).not.toHaveClass('alan-tabs-nav-active');
    expect(getByTitle('pane2')).toHaveClass('alan-tabs-nav-active');

    expect(getByTestId('pane-1')).not.toHaveClass('alan-tabs-pane-active');
    expect(getByTestId('pane-2')).toHaveClass('alan-tabs-pane-active');
  });
});
