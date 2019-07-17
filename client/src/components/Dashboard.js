import React from 'react';
import { Link } from 'react-router-dom';
import '../sass/main.scss'

const Dashboard = () => {
	return (
		<div className="landing__header"> 
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