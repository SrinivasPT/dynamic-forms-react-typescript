import { LayoutArguments } from '../Core/SmartTypes';

const CardLayout = (args: LayoutArguments) => {
    return (
        <div className='card mb-3'>
            {args.section.title ? <div className='card-header'>{args.section.title}</div> : <></>}
            <div className='card-body'>
                <div className='d-flex flex-wrap'>{args.component}</div>
            </div>
        </div>
    );
};

export default CardLayout;
