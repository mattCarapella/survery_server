import React, { Component } from "react";
import { Link } from 'react-router-dom'; 
import _ from 'lodash';
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails"; 
import "../../sass/main.scss"

const FIELDS = [
	{ label: "Survey Title", name: "title", noValueError: "Please provide a title" },
	{ label: "Subject Line", name: "subject", noValueError: "Please provide a subject" },
	{ label: "Email Body", name: "body", noValueError: "Please provide an email body" }, 
	{ label: "Recipient List", name: "emails", noValueError: "Please provide a list of valid email addresses separated by commas" }
]

class SurveyForm extends Component {

	renderFields() {
		return _.map(FIELDS, ({ label, name }) => {
			return (
				<Field key={name} component={SurveyField} type="text" label={label} name={name} />
			);
		});
	}

	render() {
		return (
			<div> 
				<form onSubmit={this.props.handleSubmit(values => console.log(values))} >	
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat left white-text form-cancel-button">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text form-submit-button">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		); 
	}
}

function validate(values) {
	const errors = {};

	errors.emails = validateEmails(values.emails || '');

	_.each(FIELDS, ({ name, noValueError }) => {
		if (!values[name]) {
			errors[name] = noValueError;  
		}
	});

	

	// if (!values.title) {
	// 	errors.title = "Please provide a title.";
	// }

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm'
})(SurveyForm);




