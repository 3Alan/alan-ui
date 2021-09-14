import React, { FC, isValidElement, ReactNode, useCallback, useEffect, useState } from 'react';
import TabNav from './components/Nav';
import TabContext from './TabContext';

export interface TabsProps {
  /**
   * 默认选中tab对应的key
   */
  defaultActiveKey?: string;
  /**
   * 选中的tab对应的key，优先级大于defaultActiveKey
   */
  activeKey?: string;
  /**
   * tab导航栏点击回调，参数为当前tabKey
   */
  onTabClick?: (activeKey: string) => void;
  /**
   * activeKey改变回调，参数为当前tabKey
   */
  onChange?: (activeKey: string) => void;
}

const cls = 'alan-tabs';

function parseTabList(children: ReactNode) {
  return React.Children.map(React.Children.toArray(children), (node) => {
    if (isValidElement(node)) {
      return { key: String(node.props.tabKey), ...node.props, node };
    }
    return null;
  }).filter((tab) => tab);
}

/**
 * 既可以当作受控组件也可以当作非受控组件
 */
export const Tabs: FC<TabsProps> = (props) => {
  const { children, defaultActiveKey, activeKey, onTabClick, onChange } = props;
  const tabs = parseTabList(children);

  const [activeIndex, setActiveIndex] = useState(activeKey || defaultActiveKey || tabs[0].key);

  const innerOnTabClick = useCallback((key: string) => {
    onTabClick?.(key);
    onChange?.(key);
    if (!activeKey) {
      setActiveIndex(key);
    }
  }, []);

  useEffect(() => {
    if (activeKey) {
      setActiveIndex(activeKey);
    }
  }, [activeKey]);

  return (
    <TabContext.Provider value={{ tabs, cls, activeKey: activeIndex }}>
      <div>
        <TabNav onTabClick={innerOnTabClick} />

        <div>
          {tabs.map((item) => {
            return React.cloneElement(item.node, {
              key: item.tabKey,
              tabKey: item.tabKey,
              active: item.tabKey === activeIndex
            });
          })}
        </div>
      </div>
    </TabContext.Provider>
  );
};

export default Tabs;
