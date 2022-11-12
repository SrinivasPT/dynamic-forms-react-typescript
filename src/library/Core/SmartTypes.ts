import { ReactNode } from 'react';

export type Page = {
    title: string;
    urlPath: string;
    sections: string[];
    sectionRepository: FormSection[];
};

export type FormSection = {
    id?: string; // If ID is not present, no ID will be added
    title: string;
    type: 'COMPLEX_CONTROL' | 'SECTION_WITH_HEADER' | 'SECTION_WITHOUT_HEADER';
    controlGroup: FormControl[];
};

export type FormControl = {
    id: string;
    type: string;
    defaultValue?: any;
    width: number;
    className?: string;
    props: ControlProperties;
};

// https://github.com/ngx-formly/ngx-formly/blob/main/src/core/src/lib/models/fieldconfig.ts
export type ControlProperties = {
    label?: string;
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    placeholder?: string;
    disabled?: boolean;
    description?: string;
    hidden?: boolean;
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    required?: boolean;
    readonly?: boolean;
    gridOptions: GridOptions;
};

export type GridOptions = {
    columnDefs: ColumnDefs[];
};

export type ColumnDefs = {
    id: string;
    label: string;
    width: number;
};

export type ApplicationContext = {
    state: State | null;
    dispatch: (dispatchEvent: DispatchEvent) => void;
};

export type State = {
    formConfig?: Page;
    data?: any;
    domain?: Domain;
    flags: StateFlags;
    internal: InternalState;
};

export type InternalState = {
    tableSearchCriteria: {};
};

export type StateFlags = {
    isDataLoading: boolean;
};

export type DomainElement = {
    categoryCode: string;
    code: string;
    value: string;
    parentCode: string;
};

export type Domain = Map<string, DomainElement>;

export type DispatchEvent = {
    type: string;
    payload?: ControlValueChange | FormDataFromDBReceived | TableSearchCriteriaChange | any;
};

export type ControlValueChange = {
    dataKey: string;
    name: string;
    value: any;
};

export type TableSearchCriteriaChange = {
    tableName: string;
    id: string;
    value: String;
};

export type FormDataFromDBReceived = {
    config: Page;
    data: any;
    domain: DomainElement[];
};

export type PageBuilderArguments = {
    pageName: string;
    id: number;
};

export type FormBuilderArguments = {
    section: FormSection;
    dataKey: string;
};

export type SimpleFormControlArguments = {
    control: FormControl;
    dataKey: string;
};

export type ObjectWithKeys = {
    [key: string]: string | number | ObjectWithKeys;
};

export type LayoutArguments = {
    section: FormSection;
    component: ReactNode;
};
