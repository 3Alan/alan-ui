import React, { FC, isValidElement, ReactNode, useCallback, useEffect, useState } from 'react';
import { TabPane, TabPaneProps } from './components/Pane';
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
      return { props: node.props, node };
    }
    return null;
  }).filter((tab) => tab);
}

/**
 * 既可以当作受控组件也可以当作非受控组件
 */
export const Tabs: FC<TabsProps> & { TabPane: FC<TabPaneProps> } = (props) => {
  const { children, defaultActiveKey, activeKey, onTabClick, onChange } = props;
  const tabs = parseTabList(children);

  const [activeIndex, setActiveIndex] = useState(activeKey || defaultActiveKey || tabs[0].props.tabKey);

  const innerOnTabClick = useCallback((key: string, disabled: boolean) => {
    if (!disabled) {
      onTabClick?.(key);
      onChange?.(key);
      if (!activeKey) {
        setActiveIndex(key);
      }
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

        <div className={`${cls}-content`}>
          {tabs.map((item) => {
            return React.cloneElement(item.node, {
              tabKey: item.props.tabKey,
              active: item.props.tabKey === activeIndex,
              testId: `pane-${item.props.tabKey}`,
              ...item.props
            });
          })}
        </div>
      </div>
    </TabContext.Provider>
  );
};

Tabs.TabPane = TabPane;

export default Tabs;
