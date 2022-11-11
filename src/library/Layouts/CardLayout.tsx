import { LayoutArguments } from '../Core/SmartTypes';

const CardLayout = (args: LayoutArguments) => {
    return (
        <div className='card'>
            {args.section.title ? <h6 className='card-header'>{args.section.title}</h6> : <></>}
            <div className='card-body'>
                <div className='d-flex flex-wrap'>{args.component}</div>
            </div>
        </div>
    );
};

export default CardLayout;
