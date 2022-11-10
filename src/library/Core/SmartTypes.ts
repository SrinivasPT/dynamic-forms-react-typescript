export type Page = {
    title: string;
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
};

export type ApplicationContext = {
    state: State | null;
    dispatch: (dispatchEvent: DispatchEvent) => {};
};

export type State = {
    formConfig: Page;
    data: any;
    domain: Domain;
};

export type DomainElement = {
    code: string;
    value: string;
};

export type Domain = Map<string, DomainElement>;

export type DispatchEvent = {
    type: string;
    payload: ControlValueChange | any;
};

export type ControlValueChange = {
    dataKey: string;
    name: string;
    value: any;
};
