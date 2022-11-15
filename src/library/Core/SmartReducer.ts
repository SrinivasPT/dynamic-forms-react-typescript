import { filter, getGridInitialState, getPageData, gridInSearchMode } from '../Service/GridService';
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
            state.internal = action.payload.internal;
            state.flags.isDataLoading = false;
            break;

        case 'CONTROL_VALUE_CHANGE':
            const nodes = action.payload.dataKey.split('.');
            let element: ObjectWithKeys = {};
            for (let i = 0; i < nodes.length; i++) {
                if (i === 0) element = state.data[nodes[i]];
                else if (i < nodes.length - 1) element = element[nodes[i]] as ObjectWithKeys;
                else element[nodes[i]] = action.payload.value;
            }
            break;

        case 'GRID_INTERNAL_STATE_INIT':
            state.internal.gridState.push(
                getGridInitialState(
                    action.payload.control.id,
                    action.payload.originalData,
                    action.payload.control.props.gridOptions.pageSize
                )
            );
            break;

        case 'TABLE_SEARCH_CRITERIA_VALUE_CHANGE':
            {
                const gridIndex = state.internal?.gridState?.findIndex((grid) => grid.id === action.payload.control.id);
                const gridState = state.internal.gridState[gridIndex];
                gridState.searchCriteria = { ...gridState?.searchCriteria, [action.payload.id]: action.payload.value };
                gridState.filteredData = gridInSearchMode(gridState.searchCriteria)
                    ? filter(action.payload.originalData, gridState.searchCriteria)
                    : action.payload.originalData;
                gridState.pageData = getPageData(1, action.payload.control.props.gridOptions.pageSize, gridState.filteredData);
                state.internal.gridState[gridIndex] = gridState;
            }
            break;

        case 'GRID_PAGE_CHANGE':
            {
                const gridIndex = state.internal?.gridState?.findIndex((grid) => grid.id === action.payload.control.id);
                const gridState = state.internal.gridState[gridIndex];
                gridState.pageData = getPageData(
                    action.payload.pageNumber,
                    action.payload.control.props.gridOptions.pageSize,
                    gridState.filteredData
                );
                state.internal.gridState[gridIndex] = gridState;
            }
            break;

        default:
            throw new Error();
    }
};

export default smartReducer;
