import React from 'react';

const FormElement = props => {

    const inputClasses = [];

    if (props.type === 'file') {
        inputClasses.push('form-control-file')
    } else {
        inputClasses.push('form-control')
    }

    if (props.error) {
        inputClasses.push('is-invalid');
    }

    return (
        <div className="row">
            <div className="form-group mb-2 col-12">
                <label>{props.title}</label>

                {props.type === 'textarea'
                    ? <textarea
                        name={props.propertyName}
                        value={props.value}
                        onChange={props.onChange}
                        required={props.required}
                        placeholder={props.placeholder}
                        className={inputClasses.join(' ')}
                    />
                    : <input
                        type={props.type}
                        name={props.propertyName}
                        value={props.value}
                        onChange={props.onChange}
                        required={props.required}
                        placeholder={props.placeholder}
                        className={inputClasses.join(' ')}
                    />
                }

                {props.error && (
                    <div className="invalid-feedback">
                        {props.error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormElement;
