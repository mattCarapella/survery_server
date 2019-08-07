import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import '../../sass/main.scss';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>
					{formValues[name]}
				</div>
			</div>			
		);
	});

	return (
		<div>
			<h3>Please Confirm Your Entries</h3>
			{reviewFields}	
			<button 
				onClick={onCancel} 
				className="yellow darken-3 white-text btn-flat form-cancel-button" 
			>
				Back
				<i className="material-icons right">clear</i>
			</button>
			<button 
				onClick={() => submitSurvey(formValues, history)} 
				className="teal btn-flat right white-text form-submit-button" 
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
}

function mapStateToProps(state) {
	// console.log(state.form.surveyForm.values);
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));











	// ********** Refactored above => notice field was destructured so we can just use name and label rather than field.name ...
	// const reviewFields = _.map(formFields, field => {
	// 	return (
	// 		<div key={field.name }>
	// 			<label>{field.label}</label>
	// 			<div>
	// 				{formValues[field.name]}
	// 			</div>
	// 		</div>			
	// 	);
	// });




// <div>
				// <div>
				// 	<label>Survey Title</label>
				// 	<div>{formValues.title}</div>
				// </div>
				
// 				<div>
// 					<label>Subject Line</label>
// 					<div>{formValues.subject}</div>
// 				</div>

// 				<div>
// 					<label>Email Body</label>
// 					<div>{formValues.body}</div>
// 				</div>

// 				<div>
// 					<label>Recipients</label>
// 					<div>{formValues.emails}</div>
// 				</div>			

// 			</div>