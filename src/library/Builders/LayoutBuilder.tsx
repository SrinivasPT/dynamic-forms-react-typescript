import { LayoutArguments } from '../Core/SmartTypes';
import CardLayout from '../Layouts/CardLayout';

const LayoutBuilder = (args: LayoutArguments) => {
    const getLayout = () => {
        switch (args.section.type) {
            case 'SECTION_WITH_HEADER':
                return <CardLayout section={args.section} component={args.component} />;
            default:
                return new Error();
        }
    };

    return <div className='mb-2'>{<>{getLayout()}</>}</div>;
};

export default LayoutBuilder;
