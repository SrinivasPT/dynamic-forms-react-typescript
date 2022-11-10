import { useContext } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { FormBuilderArguments, FormControl } from '../Core/SmartTypes';
import TextControl from '../SimpleControls/TextControl';

const FormBuilder = (args: FormBuilderArguments) => {
    const { state } = useContext(SmartContext);

    const getControl = (control: FormControl) => {
        const childDataKey = args.dataKey + '.' + control.id;
        switch (control.type) {
            case 'TEXT':
                return <TextControl key={control.id} control={control} dataKey={childDataKey} />;
            default:
                return new Error();
        }
    };

    return <>{[args.section.controlGroup.map((control) => getControl(control))]}</>;
};

export default FormBuilder;
