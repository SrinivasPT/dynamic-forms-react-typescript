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

export const getPageData = (pageNumber: number, pageSize: number, data: any[]) => {
    let pageData = [];

    for (let i = (pageNumber - 1) * pageSize; i < Math.min(pageNumber * pageSize, data.length); i++) {
        pageData.push(data[i]);
    }

    return pageData.length === 0 ? [] : pageData;
};

export const getGridInitialState = (id: string, data: any[], pageSize: number) => {
    return {
        id: id,
        searchCriteria: {},
        currentPage: 1,
        filteredData: data,
        pageData: getPageData(1, pageSize, data),
    };
};
