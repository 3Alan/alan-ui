import { FC } from 'react';
import { Options } from 'roughjs/bin/core';
import RoughContext from './context';

export interface ConfigProviderProps extends Options {}

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const { children, ...restProps } = props;

  return <RoughContext.Provider value={{ ...restProps }}>{children}</RoughContext.Provider>;
};

export default ConfigProvider;
