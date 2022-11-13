import { useContext, useState } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { getControlValueFromState } from '../Core/SmartFunctions';
import { SimpleFormControlArguments, State } from '../Core/SmartTypes';
import { filter, getSearchCriteriaShape, gridInSearchMode } from '../Service/GridService';

const TableControl = (args: SimpleFormControlArguments) => {
    const { state } = useContext(SmartContext);
    const { control, dataKey } = args;
    let data = getControlValueFromState(args.dataKey, state as State);
    const [filteredData, setFilteredData] = useState([...data]);
    const [searchCriteria, setSearchCriteria] = useState(getSearchCriteriaShape(control));
    let newFilteredData = filteredData;

    const handleChange = (id: string, value: string) => {
        const newSearchCriteria = { ...searchCriteria, [id]: value };
        setSearchCriteria(newSearchCriteria);
        if (gridInSearchMode(newSearchCriteria)) setFilteredData(filter([...data], newSearchCriteria));
        else {
            newFilteredData = [...data];
            setFilteredData(newFilteredData);
        }
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
                                onChange={(event) => handleChange(column.id, event.target.value)}
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
                {newFilteredData.map((row: any, rowIndex: number) => (
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
