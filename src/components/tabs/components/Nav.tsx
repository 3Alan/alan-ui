import classNames from 'classnames';
import { FC, useContext } from 'react';
import TabContext from '../TabContext';

export interface TabNavProps {
  onTabClick: (activeKey: string) => void;
}

export const TabNav: FC<TabNavProps> = (props) => {
  const { tabs, cls, activeKey } = useContext(TabContext);
  const { onTabClick } = props;

  return (
    <div className={`${cls}-nav-wrap`}>
      {tabs.map((item) => (
        <div
          className={classNames(`${cls}-nav-item`, { [`${cls}-nav-active`]: activeKey === item.key })}
          key={item.key}
          onClick={() => onTabClick(item.key)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default TabNav;
