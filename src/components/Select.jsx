import React, { forwardRef } from 'react';
import { useId } from 'react-id-generator'; // Assuming useId is imported from a library like react-id-generator

const Select = forwardRef(({ options, label, className = '', ...props }, ref) => {
    const id = useId(); // Assuming useId generates a unique ID for accessibility

    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}>
                {options.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
