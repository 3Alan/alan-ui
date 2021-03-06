import classNames from 'classnames';
import { FC, useContext, useEffect, useState } from 'react';
import TabContext from '../TabContext';
import ReactRough, { LinearPath } from '../../rough';
import { getTabsNavInfo, TabsNavInfo } from '../../../utils';

export interface TabNavProps {
  onTabClick: (activeKey: string, disabled: boolean) => void;
}

export const TabNav: FC<TabNavProps> = (props) => {
  const { tabs, cls, activeKey } = useContext(TabContext);
  const { onTabClick } = props;
  const [canvasInfo, setCanvasInfo] = useState<TabsNavInfo>({ path: [], canvasSize: { width: 0, height: 0 } });

  useEffect(() => {
    const info = getTabsNavInfo(`.${cls}-nav-wrap`, `.${cls}-nav-item-${activeKey}`);

    setCanvasInfo(info);
  }, [activeKey]);

  return (
    <div className={`${cls}-nav-wrap`}>
      <ReactRough width={canvasInfo.canvasSize.width} height={canvasInfo.canvasSize.height} renderer="svg">
        <LinearPath points={canvasInfo.path} bowing={0.5} roughness={0.8} />
      </ReactRough>

      {tabs.map(({ props: { title, tabKey, disabled } }) => (
        <div
          title={title}
          className={classNames(`${cls}-nav-item-${tabKey}`, `${cls}-nav-item`, {
            [`${cls}-nav-active`]: activeKey === tabKey,
            [`${cls}-nav-disabled`]: disabled
          })}
          key={tabKey}
          onClick={() => onTabClick(tabKey, disabled || false)}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default TabNav;
