import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import '../sass/main.scss'

const Dashboard = () => {
	return (
		<div className="dashboard__header"> 
			<SurveyList />
			<h1>servit</h1>
			<p>feedback collection made simple</p>
			<div className="fixed-action-btn">
			  <Link to="/surveys/new" className="btn-floating btn-large red add-button">
			    <i className="large material-icons">add</i>
			  </Link>
			 </div>
		</div>
	)
}

export default Dashboard;