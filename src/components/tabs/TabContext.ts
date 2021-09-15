import React from 'react';
import { TabPaneProps } from './components/Pane';

export interface Tab {
  node: React.ReactNode;
  props: TabPaneProps;
}

export interface TabContextProps {
  tabs: Tab[];
  cls: string;
  activeKey: string;
}

const TabContext = React.createContext<TabContextProps>({ tabs: [], cls: '', activeKey: '' });

export default TabContext;
