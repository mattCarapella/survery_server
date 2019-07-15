import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../sass/main.scss';

class Header extends Component {

	renderContent() {
		switch(this.props.auth) {
			case null: 
				return;
			case false:
				return (
					<li><a href="/auth/google">Login with Google</a></li> 
				);
			default: 
				return (
					<li><a href="/api/logout">Logout</a></li>
				);
		}
	}

	render() {
		//console.log(this.props);
		return (
			<nav>
				<div className="nav-wrapper">
      		<Link to={ this.props.auth ? '/surveys' : '/' } className="left brand-logo">
      			ServA
      		</Link>
					<ul className="right"> 
						{ this.renderContent() }
					</ul>
				</div>
			</nav>
		);
	}
}

// function mapStateToProps(state) {
// 	// returned object is passed to header as props, auth comes from reducers/index.js
// 	return { auth: state.auth }; 
// }

// ********* REFACTORED *********
function mapStateToProps({ auth }) {
	return { auth }; 
}

export default connect(mapStateToProps)(Header);