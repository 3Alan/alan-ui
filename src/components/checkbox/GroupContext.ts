import React from 'react';

export interface CheckboxGroupContext {
  value: string[];
  disabled?: boolean;
  toggleOption: (value: string) => void;
}

const GroupContext = React.createContext<CheckboxGroupContext | null>(null);

export default GroupContext;
