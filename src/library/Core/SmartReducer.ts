import { DispatchEvent, ObjectWithKeys, State } from './SmartTypes';

const smartReducer = (state: State, action: DispatchEvent) => {
    switch (action.type) {
        case 'FETCH_PAGE_DATA_BEGIN':
            state.flags.isDataLoading = true;
            break;

        case 'FETCH_PAGE_DATA_END':
            state.data = action.payload.data;
            state.domain = action.payload.domain;
            state.formConfig = action.payload.config;
            state.flags.isDataLoading = false;
            break;

        case 'CONTROL_VALUE_CHANGE':
            const nodes = action.payload.dataKey.split('.');
            let element: ObjectWithKeys = {};
            for (let i = 0; i < nodes.length; i++) {
                if (i === 0) {
                    element = state.data[nodes[i]];
                } else if (i < nodes.length - 1) {
                    element = element[nodes[i]] as ObjectWithKeys;
                } else {
                    element[nodes[i]] = action.payload.value;
                }
            }
            break;

        default:
            throw new Error();
    }
};

export default smartReducer;
