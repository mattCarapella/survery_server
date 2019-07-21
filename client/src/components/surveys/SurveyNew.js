import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import '../../sass/main.scss'

class SurveyNew extends Component {
	render() {
		return (
			<div className="survey-new"> 
				<SurveyForm />
			</div>
		)
	}
}

export default SurveyNew;