import { FC } from 'react';
import Trigger from 'rc-trigger';
import PopoverWrap from '../roughWrap/PopoverWrap';

const cls = 'tooltip';

export interface ToolTipProps {
  content: string;
  placement?: string;
  children: React.ReactElement;
}

export const ToolTip: FC<ToolTipProps> = props => {
  const { children, placement, content } = props;

  return (
    <Trigger
      popupPlacement={placement}
      action={['hover']}
      destroyPopupOnHide
      popupClassName={`${cls}-popup`}
      mouseLeaveDelay={0.3}
      popupAlign={{
        // [popup元素对齐方式,目标元素对齐方式]
        points: ['bl', 'tl'],
        // popup内容相对目标元素的偏移量[x,y]
        offset: [0, -10]
      }}
      popup={<PopoverWrap className={`${cls}-content`}>{content}</PopoverWrap>}
    >
      {children}
    </Trigger>
  );
};

ToolTip.defaultProps = {
  placement: 'top'
};

export default ToolTip;
