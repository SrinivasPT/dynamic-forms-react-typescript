import { useContext } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { getControlValueFromState, isEmpty } from '../Core/SmartFunctions';
import { SimpleFormControlArguments, State } from '../Core/SmartTypes';

const TableControl = (args: SimpleFormControlArguments) => {
    const { state, dispatch } = useContext(SmartContext);
    const { control, dataKey } = args;
    let data = getControlValueFromState(args.dataKey, state as State);
    data = isEmpty(data) ? [] : data;

    const handleChange = (tableName: string, id: string, value: string) => {
        dispatch({ type: 'TABLE_SEARCH_CRITERIA_VALUE_CHANGE', payload: { tableName, id, value } });
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
                                onChange={(event) => handleChange(control.id, column.id, event.target.value)}
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
                {data.map((row: any, rowIndex: number) => (
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
        <table className='table table-sm table-bordered border-muted table-hover'>
            {getHeader()}
            {getBody()}
        </table>
    );
};

export default TableControl;
