import { FC, memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDebounceFn } from 'ahooks';

import { annotate } from 'rough-notation';
import { RoughAnnotation } from 'rough-notation/lib/model.d';
import { getPopoverPosition, isElementVisible } from '../../utils';
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
  /** 高亮颜色 */
  spotColor?: string;
  multiline?: boolean;
  content: ReactNode;
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
  const [show, setShow] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentContent, setCurrentContent] = useState<ReactNode>();

  const annotation = useRef<RoughAnnotation>();

  // popover挂载的位置
  const [parentEl, setParentEl] = useState<HTMLElement>();
  const popoverRef = useRef();
  const [popoverStyle, setPopoverStyle] = useState({});

  const computePopoverStyles = () => {
    const { selector } = steps[currentIndex];
    const { top, left } = getPopoverPosition(selector, popoverRef);
    setPopoverStyle({ top: top + 20, left });
  };

  const { run: handleResize } = useDebounceFn(computePopoverStyles, { wait: 200 });

  const handleStepChange = () => {
    annotation.current?.remove();
    const { selector, spotType = 'box', content, spotColor = 'black', multiline } = steps[currentIndex];
    const e = document.querySelector(selector) as HTMLElement;
    const parent = (e.offsetParent || document.body) as HTMLElement;
    setParentEl(parent);

    annotation.current = annotate(e, { type: spotType, color: spotColor, multiline });
    annotation.current.show();

    const isVisible = isElementVisible(selector);

    if (!isVisible) {
      e.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    computePopoverStyles();
    setCurrentContent(content);
  };

  useEffect(() => {
    const { selector, spotType = 'box' } = steps[0];
    const e = document.querySelector(selector) as HTMLElement;
    annotation.current = annotate(e, { type: spotType });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      annotation.current?.remove();
    };
  }, []);

  useEffect(() => {
    handleStepChange();
  }, [currentIndex, parentEl]);

  const handleClose = () => {
    const finished = currentIndex === steps.length - 1;
    setShow(false);
    annotation.current?.remove();
    onClose?.(finished);
  };

  const onPrevClick = useCallback(() => {
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  const onNextClick = useCallback(() => {
    setCurrentIndex(currentIndex + 1);
  }, [currentIndex]);

  const PopoverContent = () => {
    return (
      <PopoverWrap
        ref={popoverRef}
        closeable
        onClose={handleClose}
        placement="bottom"
        style={popoverStyle}
        wrapClassName={`${cls}-wrap`}
        className={`${cls}-popover-content`}
      >
        <div className={`${cls}-inner`}>
          <div className={`${cls}-content`}>{currentContent}</div>
          <div className={`${cls}-footer`}>
            <span>
              {currentIndex + 1}/{steps.length}
            </span>

            {currentIndex !== 0 && (
              <Button type="standard" size="small" onClick={onPrevClick}>
                Prev
              </Button>
            )}

            {currentIndex !== steps.length - 1 && (
              <Button type="standard" size="small" onClick={onNextClick}>
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
      {show && parentEl && (
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

export default memo(Guide);
