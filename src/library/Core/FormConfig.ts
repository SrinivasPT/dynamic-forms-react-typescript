import { InternalState, Page } from './SmartTypes';

export const addInternalWorkAreaToConfig = (state: Page) => {
    const formConfig = state;
    let internalState: InternalState = { tableSearchCriteria: {} };

    formConfig?.sectionRepository.forEach((section) => {
        section.controlGroup.forEach((formControl) => {
            if (formControl.type === 'TABLE') {
                let searchCriteria = {};
                for (const columnDef of formControl.props.gridOptions.columnDefs) {
                    searchCriteria = { ...searchCriteria, [columnDef.id]: undefined };
                }
                internalState.tableSearchCriteria = Object.assign(internalState.tableSearchCriteria, { [formControl.id]: searchCriteria });
            }
        });
    });

    return internalState;
};
