import classNames from 'classnames';
import { FC, useContext } from 'react';
import TabContext from '../TabContext';

export interface TabPaneProps {
  /**
   * 顶部导航栏对应的文字
   */
  title: string;
  /**
   * 是否禁用，不要给defaultActiveKey对应的tab加上disabled
   */
  disabled?: boolean;
  className?: string;

  /**
   * 对应key值
   */
  tabKey: string;
  /**
   * 内部使用，不要传！！
   */
  active?: boolean;
  /**
   * 用于测试，不要传！！
   */
  testId?: string;
}

export const TabPane: FC<TabPaneProps> = (props) => {
  const { cls } = useContext(TabContext);

  const { children, active, testId } = props;
  return (
    <div data-testid={testId} className={classNames(`${cls}-pane`, { [`${cls}-pane-active`]: active })}>
      {children}
    </div>
  );
};

TabPane.defaultProps = {
  disabled: false
};

export default TabPane;
