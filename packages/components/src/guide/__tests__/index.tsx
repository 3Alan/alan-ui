import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { Button } from '../../button';
import Guide, { StepItem } from '../index';

// @ts-ignore
if (!SVGElement.prototype.getTotalLength) {
  // @ts-ignore
  SVGElement.prototype.getTotalLength = () => 1;
}

const steps: StepItem[] = [
  {
    selector: '#one',
    spotType: 'box',
    spotColor: 'red',
    content: 'step1'
  },
  {
    selector: '.two',
    spotType: 'underline',
    spotColor: 'red',
    content: 'step2'
  },
  {
    selector: '.two2',
    spotType: 'strike-through',
    content: 'step3'
  }
];

const GuideTester = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <p>To prevent the inability to view the docs, current example has mask props (default true) set to false</p>
      <Button onClick={() => setShow(true)} data-testid="start">
        start
      </Button>
      <p>
        Hello, my name is <span id="one">Alan</span>
      </p>
      <div style={{ height: 600, width: 200 }} />
      <p>
        It is a nice <strong className="two">guide</strong> component
      </p>
      <p>
        It is a nice <strong className="two2">guide</strong> component
      </p>
      <div style={{ height: 600, width: 200 }} />
      {show && <Guide steps={steps} />}
    </div>
  );
};

describe('Guide', () => {
  it('start guide', () => {
    const { getByTestId, getByText, queryByText } = render(<GuideTester />);
    fireEvent.click(getByTestId('start'));
    expect(getByText('step1')).toBeInTheDocument();

    expect(getByText('1/3')).toBeInTheDocument();

    // 下一步
    fireEvent.click(getByText('Next'));
    expect(getByText('2/3')).toBeInTheDocument();
    expect(getByText('Prev')).toBeInTheDocument();
    expect(queryByText('finish')).toBeFalsy();

    fireEvent.click(getByText('Prev'));
    expect(getByText('1/3')).toBeInTheDocument();

    fireEvent.click(getByText('Next'));
    fireEvent.click(getByText('Next'));
    expect(queryByText('Next')).toBeFalsy();
    expect(getByText('finish')).toBeInTheDocument();

    fireEvent.click(getByText('finish'));
    expect(queryByText('finish')).toBeFalsy();
  });
});
