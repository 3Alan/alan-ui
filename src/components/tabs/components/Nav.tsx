import classNames from 'classnames';
import { FC, useContext } from 'react';
import TabContext from '../TabContext';
import RoughWrap from '../../roughWrap';

export interface TabNavProps {
  onTabClick: (activeKey: string, disabled: boolean) => void;
}

export const TabNav: FC<TabNavProps> = (props) => {
  const { tabs, cls, activeKey } = useContext(TabContext);
  const { onTabClick } = props;

  return (
    <RoughWrap
      contentClassName={`${cls}-nav-wrap`}
      customElement="div"
      shape="roundedRectTangle"
      radius="6 6 6 6"
      roughProps={{
        fill: '#fff',
        stroke: '#1F2937',
        fillStyle: 'solid',
        roughness: 0
      }}
    >
      {tabs.map(({ props: { title, tabKey, disabled } }) => (
        <RoughWrap
          className={classNames(`${cls}-nav-item-${tabKey}`, `${cls}-nav-item`, {
            [`${cls}-nav-active`]: activeKey === tabKey,
            [`${cls}-nav-disabled`]: disabled
          })}
          title={title}
          key={tabKey}
          customElement="div"
          shape="roundedRectTangle"
          radius="6 6 6 6"
          roughProps={{
            fill: activeKey === tabKey ? '#ddd6fe' : 'transparent',
            stroke: activeKey === tabKey ? '#1F2937' : 'transparent',
            fillStyle: 'solid',
            roughness: 0
          }}
          onClick={() => onTabClick(tabKey, disabled || false)}
        >
          {title}
        </RoughWrap>
      ))}
    </RoughWrap>
  );
};

export default TabNav;
