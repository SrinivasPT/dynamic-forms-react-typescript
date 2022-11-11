import { useContext, useRef } from 'react';
import { SmartContext } from '../Core/SmartContext';
import { getControlValueFromState, handleControlValueChange } from '../Core/SmartFunctions';
import { SimpleFormControlArguments } from '../Core/SmartTypes';

const TextControl = (args: SimpleFormControlArguments) => {
    const { state, dispatch } = useContext(SmartContext);
    const data = getControlValueFromState(args.dataKey, state?.data);
    const formControlRef = useRef(null); // Note: For providing reference to ErrorControl

    return (
        <>
            <label htmlFor={args.control.id} className='form-label'>
                {`${args.control.props.label} ${args.control.props.required ? '*' : ''}`}
            </label>
            <input
                type={args.control.type}
                className={`form-control`}
                id={args.control.id}
                placeholder={args.control.props.placeholder}
                inputMode={args.control.props.inputMode}
                value={data}
                required={args.control.props.required}
                onChange={(event) => handleControlValueChange(args.control.id, event.target.value, args.dataKey, dispatch)}
                minLength={args.control.props.minLength}
                maxLength={args.control.props.maxLength}
                min={args.control.props.min}
                max={args.control.props.max}
                ref={formControlRef}
            />
        </>
    );
};

export default TextControl;
