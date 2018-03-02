import React, { Component } from 'react';
const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning, invalid },

                     }) => (
    <div className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${(input.value)? 'is-dirty':''} ${(touched && invalid)?'is-invalid':''}`}>

        <input {...input} type={type}
        className="mdl-textfield__input"
        />

        <label className="mdl-textfield__label">{label}</label>

        {touched &&
        ((error && <span className="mdl-textfield__error">{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
)

const required = value => (value ? undefined : 'Required')

export {renderField, required};