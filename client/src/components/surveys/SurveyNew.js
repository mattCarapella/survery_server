import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import '../../sass/main.scss'

class SurveyNew extends Component {
	
	// constructor(props) {
	// 	super(props);
	// 	this.state = { new: true };
	// }
	// *** equivilent to:
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview) {
			return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
		}
		return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
	}

	render() {
		return (
			<div className="survey-new"> 
				{this.renderContent()}
			</div>
		)
	}
}

export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);