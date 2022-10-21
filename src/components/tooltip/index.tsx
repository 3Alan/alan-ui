import React, { FC, memo } from 'react';
import Trigger from 'rc-trigger';
import PopoverWrap from '../roughWrap/PopoverWrap';
import placements, { PlacementsType, TriggerType } from './constants';

const cls = 'alan-tooltip';

export interface ToolTipProps {
  content: string;
  /**
   * 悬浮框位置
   */
  placement?: PlacementsType;
  /**
   * 触发事件
   */
  trigger?: TriggerType;
  children: React.ReactElement;
}

/**
 * 目前仅支持上下左右四个方位
 */
export const ToolTip: FC<ToolTipProps> = (props) => {
  const { children, placement, content, trigger = 'hover' } = props;

  return (
    <Trigger
      popupPlacement={placement}
      builtinPlacements={placements}
      action={[trigger]}
      destroyPopupOnHide
      popupClassName={`${cls}-popup`}
      mouseLeaveDelay={0.3}
      popup={
        <PopoverWrap placement={placement} fill="#1F2937" className={`${cls}-content`}>
          {content}
        </PopoverWrap>
      }
    >
      {children}
    </Trigger>
  );
};

ToolTip.defaultProps = {
  placement: 'top',
  trigger: 'hover'
};

export default memo(ToolTip);
