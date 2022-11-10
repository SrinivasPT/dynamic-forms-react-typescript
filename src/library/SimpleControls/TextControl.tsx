import { useContext, useRef } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { getControlValueFromState, handleControlValueChange } from '../Core/SmartFunctions';
import { FormControl } from '../Core/SmartTypes';

const TextControl = (config: FormControl, dataKey: string) => {
    const { state, dispatch } = useContext(SmartContext);
    const data = getControlValueFromState(dataKey, state?.data);
    const formControlRef = useRef(null); // Note: For providing reference to ErrorControl

    return (
        <div className={`has-validation col-${config.width}`}>
            <label htmlFor={config.id} className='form-label'>
                {`${config.props.label} ${config.props.required ? '*' : ''}`}
            </label>
            <input
                type={config.type}
                className={`form-control`}
                id={config.id}
                placeholder={config.props.placeholder}
                inputMode={config.props.inputMode}
                value={data}
                required={config.props.required}
                onChange={(event) => handleControlValueChange(config.id, event.target.value, dispatch)}
                minLength={config.props.minLength}
                maxLength={config.props.maxLength}
                min={config.props.min}
                max={config.props.max}
                ref={formControlRef}
            />
        </div>
    );
};

export default TextControl;
