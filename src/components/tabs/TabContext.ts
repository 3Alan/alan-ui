import React from 'react';
import { TabPaneProps } from './components/Pane';

export interface Tab extends TabPaneProps {
  key: string;
  node: React.ReactNode;
}

export interface TabContextProps {
  tabs: Tab[];
  cls: string;
  activeKey: string;
}

const TabContext = React.createContext<TabContextProps>({ tabs: [], cls: '', activeKey: '' });

export default TabContext;
