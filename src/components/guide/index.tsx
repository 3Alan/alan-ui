import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Annotation } from 'react-rough-notation/dist/RoughNotation/types';
import { annotate } from 'rough-notation';
import { getPoverPostionBySelector } from '../../utils';
import useOnClickOutside from '../../utils/hooks/useOnClickOutside';
import Button from '../button';
import PopoverWrap from '../roughWrap/PopoverWrap';

const cls = 'alan-guide';

export interface StepItem {
  selector: string;
  spotType?: 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket';
  spotColor?: string;
  content: any;
}

interface GuideProps {
  steps: StepItem[];
}

/**
 * 新手引导组件
 */
export const Guide: FC<GuideProps> = (props) => {
  const { steps } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [popoverStyle, setPopoverStyle] = useState({});
  const [currentContent, setCurrentContent] = useState(null);
  const annotation = useRef<Annotation>();
  const popoverRef = useRef();
  useOnClickOutside(popoverRef, () => {
    console.log('hahah');
  });

  useEffect(() => {
    const { selector, spotType } = steps[0];
    const e = document.querySelector(selector) as HTMLElement;
    annotation.current = annotate(e, { type: spotType });

    return () => {
      annotation.current?.remove();
    };
  }, []);

  useEffect(() => {
    annotation.current?.remove();
    const { selector, spotType, content, spotColor = 'black' } = steps[currentIndex];
    const e = document.querySelector(selector) as HTMLElement;

    const { bottom, left } = getPoverPostionBySelector(selector, popoverRef);

    annotation.current = annotate(e, { type: spotType, color: spotColor });
    annotation.current.show();

    console.log(bottom, left);

    setPopoverStyle({ top: bottom + 20, left, position: 'absolute' });
    setCurrentContent(content);
  }, [currentIndex, popoverRef]);

  const close = () => {
    setShow(false);
    annotation.current?.remove();
  };

  const PopoverContent = () => {
    return (
      <PopoverWrap
        ref={popoverRef}
        placement="bottom"
        style={popoverStyle}
        roughness={0.4}
        fill="#fff"
        fillStyle="solid"
        className={`${cls}-container`}
      >
        <div className={`${cls}-inner`}>
          <div className={`${cls}-content`}>{currentContent}</div>
          <div>
            {currentIndex + 1}/{steps.length}
            <Button
              type="standard"
              size="small"
              onClick={() => {
                if (currentIndex < steps.length && currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                }
              }}
            >
              Prev
            </Button>
            <Button
              type="standard"
              size="small"
              onClick={() => {
                if (currentIndex < steps.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            >
              Next
            </Button>
            {currentIndex === steps.length - 1 ? (
              <Button size="small" onClick={close}>
                finish
              </Button>
            ) : (
              <Button size="small" onClick={close}>
                skip
              </Button>
            )}
          </div>
        </div>
      </PopoverWrap>
    );
  };

  return <>{show && createPortal(<PopoverContent />, document.body)}</>;
};

Guide.defaultProps = {};

export default Guide;
