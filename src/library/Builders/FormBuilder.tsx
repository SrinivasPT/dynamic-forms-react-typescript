import { useContext } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { FormBuilderArguments, FormControl, FormSection } from '../Core/SmartTypes';
import TextControl from '../SimpleControls/TextControl';
import LayoutBuilder from './LayoutBuilder';

const FormBuilder = (args: FormBuilderArguments) => {
    const { state } = useContext(SmartContext);

    const getControl = (control: FormControl) => {
        const childDataKey = args.dataKey + '.' + control.id;
        let element;
        const getSectionConfig = (sectionName: string) =>
            state?.formConfig?.sectionRepository.find((section) => section.id === sectionName);

        switch (control.type) {
            case 'TEXT':
                element = <TextControl control={control} dataKey={childDataKey} />;
                break;
            case 'SMART':
                element = <FormBuilder section={getSectionConfig(control.id) as FormSection} dataKey={childDataKey} />;
                break;
            default:
                throw new Error();
        }

        return (
            <div key={control.id} className={`has-validation ${control.className} p-2`}>
                {element}
            </div>
        );
    };

    return <LayoutBuilder section={args.section} component={<>{args.section.controlGroup.map((control) => getControl(control))}</>} />;
};

export default FormBuilder;
