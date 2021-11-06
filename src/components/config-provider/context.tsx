import React from 'react';
import { Options } from 'roughjs/bin/core';

export interface RoughContextOptions extends Options {}

const GlobalRoughContext = React.createContext<RoughContextOptions | null>(null);

export default GlobalRoughContext;
