import { PaginationArguments } from '../Core/SmartTypes';

const PaginationControl = (props: PaginationArguments) => {
    const { data, pageSize, onPageChange } = props;
    const numberOfPage = Math.ceil(data.length / pageSize);

    const handlePageClick = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    const getButtons = () => {
        let buttons = [];

        for (let step = 1; step <= numberOfPage; step++) {
            buttons.push(
                <button key={step} type='button' className='btn btn-light' onClick={() => handlePageClick(step)}>
                    {step}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className='d-flex flex-wrap justify-content-end'>
            <div className='btn-group btn-group-sm' role='group' aria-label='Small button group'>
                <button type='button' className='btn btn-light'>
                    {'<<  Prev'}
                </button>
                <>{getButtons()}</>
                <button type='button' className='btn btn-light'>
                    {'Next  >>'}
                </button>
            </div>
        </div>
    );
};

export default PaginationControl;
