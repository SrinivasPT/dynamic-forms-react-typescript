import { FormBuilderArguments, FormControl } from '../Core/SmartTypes';
import TextControl from '../SimpleControls/TextControl';
import LayoutBuilder from './LayoutBuilder';

const FormBuilder = (args: FormBuilderArguments) => {
    const getControl = (control: FormControl) => {
        const childDataKey = args.dataKey + '.' + control.id;
        switch (control.type) {
            case 'TEXT':
                return <TextControl key={control.id} control={control} dataKey={childDataKey} />;
            default:
                return new Error();
        }
    };

    return <LayoutBuilder section={args.section} component={<>{args.section.controlGroup.map((control) => getControl(control))}</>} />;
};

export default FormBuilder;
