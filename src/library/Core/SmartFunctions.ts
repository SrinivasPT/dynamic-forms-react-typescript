import { DispatchEvent, State } from './SmartTypes';

export const isEmpty = (obj: any) => {
    if (obj === null || obj === undefined) return true;
    if (Array.isArray(obj) && obj.length === 0) return true;
    return Object.entries(obj).length === 0 ? true : false;
};

export const getControlValueFromState = (key: string, state: State) => {
    if (isEmpty(state.data)) return;
    return key.split('.').reduce((a, c) => a[c], state.data);
};

export const handleControlValueChange = (id: string, value: any, dispatch: (dispatchEvent: DispatchEvent) => {}) =>
    dispatch({ type: 'CONTROL_VALUE_CHANGE', payload: dispatchEvent });
