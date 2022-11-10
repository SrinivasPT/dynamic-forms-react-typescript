import React from 'react';
import { ApplicationContext, DispatchEvent } from './SmartTypes';

export const SmartContext = React.createContext({ state: null, dispatch: (dispatchEvent: DispatchEvent) => {} } as ApplicationContext);
