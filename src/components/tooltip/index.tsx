import React, { FC } from 'react';
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
        <PopoverWrap
          placement={placement}
          roughness={0.4}
          fill="#1F2937"
          fillStyle="solid"
          className={`${cls}-content`}
        >
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

export default ToolTip;
