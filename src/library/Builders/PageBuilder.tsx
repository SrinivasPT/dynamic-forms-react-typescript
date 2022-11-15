import axios from 'axios';
import { useContext, useEffect } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { convertDomainArrayToMap } from '../Core/SmartFunctions';
import { FormSection, PageBuilderArguments } from '../Core/SmartTypes';
import FormBuilder from './FormBuilder';

const PageBuilder = (args: PageBuilderArguments) => {
    const { state, dispatch } = useContext(SmartContext);

    // TODO: Should this be out.. and leverage functions passed from the child?
    const getData = (pageName: string, id: number) => {
        const URL_FOR_CONFIG = `http://localhost:3007/Config/${pageName}`;
        const URL_FOR_FORM_DATA = `http://localhost:3007/${pageName}/${id}`;
        const URL_FOR_DOMAIN_DATA = `http://localhost:3007/domain`;

        dispatch({ type: 'FETCH_PAGE_DATA_BEGIN' });

        Promise.all([axios.get(URL_FOR_CONFIG), axios.get(URL_FOR_FORM_DATA), axios.get(URL_FOR_DOMAIN_DATA)]).then((values) => {
            dispatch({
                type: 'FETCH_PAGE_DATA_END',
                payload: {
                    config: values[0].data,
                    data: values[1].data,
                    domain: convertDomainArrayToMap(values[2].data),
                    internal: { gridState: [] },
                },
            });
        });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        const URL_FOR_FORM_DATA = `http://localhost:3007/${args.pageName}/${args.id}`;
        event.preventDefault();
        console.log(state?.data);
        console.log(state);
        axios.put(URL_FOR_FORM_DATA, state?.data);
    };

    useEffect(() => {
        getData(args.pageName, args.id);
    }, []);

    const getSectionConfig = (sectionName: string) => state?.formConfig?.sectionRepository.find((section) => section.id === sectionName);

    return (
        <>
            {state?.flags.isDataLoading && <div>Loading...</div>}
            {/* TODO: Error display condition to be added*/}
            {!state?.flags.isDataLoading && (
                <form className='needs-validation m-3' noValidate onSubmit={handleSubmit}>
                    {state?.formConfig?.sections.map((section) => (
                        <FormBuilder
                            key={section}
                            section={getSectionConfig(section) as FormSection}
                            dataKey={getSectionConfig(section)?.id as string}
                        />
                    ))}

                    <button type='submit' className='btn btn-primary m-3'>
                        Submit
                    </button>
                </form>
            )}
        </>
    );
};

export default PageBuilder;
