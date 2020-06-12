import React from 'react'


// [ STYLING ]
import './FormInput.styles.scss';


const FormInput = ({ handleOnChange, label, ...otherProps }) => {


    return (
        <div className="group">
            <input className='form-input' onChange={handleOnChange} {...otherProps}/>
            {label ? 
                <label 
                    className={`${otherProps.value.length} ? 'shrink' : ''} form-input-label`} > { label }
                </label>
                : null
            }
        </div>
    )
};

export default FormInput;
