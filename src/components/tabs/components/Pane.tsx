import classNames from 'classnames';
import { FC, useContext } from 'react';
import TabContext from '../TabContext';

export interface TabPaneProps {
  /**
   * 顶部导航栏对应的文字
   */
  title: string;

  /**
   * 对应key值
   */
  tabKey: string;
  /**
   * 内部使用，不要传！！
   */
  active?: boolean;
}

export const TabPane: FC<TabPaneProps> = (props) => {
  const { cls } = useContext(TabContext);

  const { children, active } = props;
  return <div className={classNames(`${cls}-pane`, { [`${cls}-pane-active`]: active })}>{children}</div>;
};

export default TabPane;
