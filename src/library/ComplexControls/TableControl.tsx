import { useContext, useEffect } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { getControlValueFromState } from '../Core/SmartFunctions';
import { GridInternalData, SimpleFormControlArguments, State } from '../Core/SmartTypes';
import { getGridInitialState } from '../Service/GridService';
import PaginationControl from './PaginationControl';

const TableControl = (args: SimpleFormControlArguments) => {
    const { state, dispatch } = useContext(SmartContext);
    const { control, dataKey } = args;
    const originalData = getControlValueFromState(args.dataKey, state as State);

    useEffect(() => {
        if (!state?.internal.gridState?.find((grid) => grid.id === control.id))
            dispatch({ type: 'GRID_INTERNAL_STATE_INIT', payload: { control, originalData } });
    }, []);

    let gridState = state?.internal.gridState.find((grid) => grid.id === control.id) as GridInternalData;
    gridState = gridState ? gridState : getGridInitialState(control.id, originalData, control.props.gridOptions.pageSize);

    const handleSearchCriteriaChange = (id: string, value: string) => {
        dispatch({ type: 'TABLE_SEARCH_CRITERIA_VALUE_CHANGE', payload: { tableName: control.id, id, value, originalData, control } });
    };

    const handlePageChange = (pageNumber: number) => {
        dispatch({ type: 'GRID_PAGE_CHANGE', payload: { pageNumber, control } });
    };

    const getHeader = () => {
        return (
            <thead className='table-light'>
                <tr>
                    {control?.props?.gridOptions.columnDefs.map((column, index) => (
                        <th key={dataKey + column.id} scope='col' className={`col-${column.width} fw-semibold`}>
                            {column.label}
                        </th>
                    ))}
                </tr>
                <tr>
                    {control?.props?.gridOptions.columnDefs.map((column, index) => (
                        <th key={dataKey + column.id} scope='col'>
                            <input
                                id={column.id}
                                className='border border-1 col-12'
                                onChange={(event) => handleSearchCriteriaChange(column.id, event.target.value)}
                            />
                        </th>
                    ))}
                </tr>
            </thead>
        );
    };

    const getBody = () => {
        return (
            <tbody>
                {gridState.pageData.map((row: any, rowIndex: number) => (
                    <tr key={dataKey + rowIndex}>
                        {control['props']['gridOptions']['columnDefs'].map((column, colIndex) => (
                            <td key={dataKey + rowIndex + colIndex}>{row[column.id]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <>
            <table className='table table-sm table-bordered border-muted table-hover'>
                {getHeader()}
                {getBody()}
            </table>
            <PaginationControl
                data={gridState.filteredData}
                pageSize={control?.props?.gridOptions.pageSize}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default TableControl;
