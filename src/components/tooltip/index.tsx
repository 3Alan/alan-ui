import { FC } from 'react';
import Trigger from 'rc-trigger';
import RoughWrap from '../roughWrap';

const cls = 'tooltip';

export interface ToolTipProps {
  content: string;
  placement?: string;
}

export const ToolTip: FC<ToolTipProps> = props => {
  const { children, placement, content } = props;

  const renderPopupContent = () => {
    return (
      <RoughWrap customElement="div" shap="rectTangle" className={`${cls}-content`}>
        {content}
      </RoughWrap>
    );
  };

  return (
    <Trigger
      popupPlacement={placement}
      action={['hover']}
      destroyPopupOnHide
      popupClassName={`${cls}-popup`}
      mouseLeaveDelay={0.3}
      popupAlign={{
        // [popup元素对齐方式,目标元素对齐方式]
        points: ['tl', 'bl'],
        // popup内容相对目标元素的偏移量[x,y]
        offset: [0, 5]
      }}
      popup={renderPopupContent}
    >
      <div>{children}</div>
    </Trigger>
  );
};

ToolTip.defaultProps = {
  placement: 'top'
};

export default ToolTip;
