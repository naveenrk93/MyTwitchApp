import React from 'react';
import {Field, reduxForm} from "redux-form";

class StreamForm extends React.Component{

    renderError = ({error, touched}) => {
        if (touched && error)
        {
            return <div className="ui mini red message">
                <div>{error}</div>
            </div>
        }
    };


    renderInput = (formProps) => {
        const ClassName= `field ${formProps.meta.error&&formProps.meta.touched?"error":""}`;
        return (
            <div className={ClassName}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render(){
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary right floated" type="submit">Submit</button>
            </form>
        );
    }
}

const validate = ( formValues) => {
    const errors={};
    if(!formValues.title)
        errors.title="You must enter a title";
    if(!formValues.description)
        errors.description="You must enter a description";

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate,
    enableReinitialize: true
})(StreamForm);
