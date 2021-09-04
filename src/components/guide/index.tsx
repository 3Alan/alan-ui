import { FC, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { Annotation } from 'react-rough-notation/dist/RoughNotation/types';
import { annotate } from 'rough-notation';
import { getPoverPostionBySelector, isElementVisible } from '../../utils';
import Button from '../button';
import Mask from '../mask';
import PopoverWrap from '../roughWrap/PopoverWrap';

const cls = 'alan-guide';

export interface StepItem {
  selector: string;
  /**
   * 高亮效果
   */
  spotType?: 'underline' | 'box' | 'circle' | 'highlight' | 'strike-through' | 'crossed-off' | 'bracket';
  spotColor?: string;
  multiline?: boolean;
  content: any;
}

export interface GuideProps {
  /**
   * 步骤
   */
  steps: StepItem[];
  /**
   * 是否显示遮罩层（透明的看不出效果，主要为了防止点击页面上的元素），
   */
  mask?: boolean;
  /**
   * skip/finish都会触发，回调参数为“是否完成”
   */
  onClose?: (finished: boolean) => void;
}

/**
 * 新手引导组件
 */
export const Guide: FC<GuideProps> = (props) => {
  const { steps, mask, onClose } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [popoverStyle, setPopoverStyle] = useState({});
  const [currentContent, setCurrentContent] = useState(null);
  const annotation = useRef<Annotation>();
  const popoverRef = useRef();
  const [parentEl, setParentEl] = useState<Element>(document.body);

  useEffect(() => {
    const { selector, spotType = 'box' } = steps[0];
    const e = document.querySelector(selector) as HTMLElement;

    annotation.current = annotate(e, { type: spotType });

    return () => {
      annotation.current?.remove();
    };
  }, []);

  useEffect(() => {
    annotation.current?.remove();
    const { selector, spotType = 'box', content, spotColor = 'black', multiline } = steps[currentIndex];
    const e = document.querySelector(selector) as HTMLElement;

    const parent = e.offsetParent || document.body;

    setParentEl(parent);

    const { bottom, left } = getPoverPostionBySelector(selector, popoverRef);

    annotation.current = annotate(e, { type: spotType, color: spotColor, multiline });
    annotation.current.show();

    setPopoverStyle({ top: bottom + 20, left });
    setCurrentContent(content);

    const isVisible = isElementVisible(selector);

    if (!isVisible) {
      e.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentIndex]);

  const handleClose = () => {
    const finished = currentIndex === steps.length - 1;
    setShow(false);
    annotation.current?.remove();
    onClose?.(finished);
  };

  const PopoverContent = () => {
    return (
      <PopoverWrap
        ref={popoverRef}
        closeable
        onClose={handleClose}
        placement="bottom"
        style={popoverStyle}
        roughness={0.4}
        fill="#fff"
        fillStyle="solid"
        wrapClassName={`${cls}-wrap`}
        className={`${cls}-popover-content`}
      >
        <div className={`${cls}-inner`}>
          <div className={`${cls}-content`}>{currentContent}</div>
          <div className={`${cls}-footer`}>
            <span>
              {currentIndex + 1}/{steps.length}
            </span>

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
            {currentIndex !== steps.length - 1 && (
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
            )}
            {currentIndex === steps.length - 1 && (
              <Button size="small" onClick={handleClose}>
                finish
              </Button>
            )}
          </div>
        </div>
      </PopoverWrap>
    );
  };

  return (
    <>
      {show && (
        <>
          {mask && <Mask color="rgba(0,0,0, 0)" />}
          {createPortal(<PopoverContent />, parentEl)}
        </>
      )}
    </>
  );
};

Guide.defaultProps = {
  mask: true
};

export default Guide;
