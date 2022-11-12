import { useContext } from 'react';
import TableControl from '../ComplexControls/TableControl';
import { SmartContext } from '../Core/SmartContext';
import { FormBuilderArguments, FormControl, FormSection } from '../Core/SmartTypes';
import TextControl from '../SimpleControls/TextControl';
import LayoutBuilder from './LayoutBuilder';

const FormBuilder = (args: FormBuilderArguments) => {
    const { state } = useContext(SmartContext);
    const { section, dataKey } = args;

    const getControl = (control: FormControl) => {
        const childDataKey = dataKey + '.' + control.id;
        let element;
        const getSectionConfig = (sectionName: string) =>
            state?.formConfig?.sectionRepository.find((section) => section.id === sectionName);

        switch (control.type) {
            case 'TEXT':
                element = <TextControl control={control} dataKey={childDataKey} />;
                break;
            case 'TABLE':
                element = <TableControl control={control} dataKey={dataKey} />;
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

    return <LayoutBuilder section={section} component={<>{section.controlGroup.map((control) => getControl(control))}</>} />;
};

export default FormBuilder;
