import { FormControl, ObjectWithKeys } from '../Core/SmartTypes';

export const filter = (data: any[], criteria: {}): any[] => {
    let filteredData = [];
    for (const [key, value] of Object.entries(criteria)) {
        if (value) {
            filteredData = data.filter((row) => row[key].toUpperCase().includes(String(value).toUpperCase()));
        }
    }
    return filteredData;
};

export const gridInSearchMode = (criteria: {}): boolean => {
    return Object.values(criteria).some((value) => value);
};

export const getSearchCriteriaShape = (control: FormControl): ObjectWithKeys => {
    let searchCriteria = {};
    for (const columnDef of control.props.gridOptions.columnDefs) {
        searchCriteria = { ...searchCriteria, [columnDef.id]: undefined };
    }
    return searchCriteria;
};
