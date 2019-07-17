import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
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
				return [
					<li key="1" className='header__links--item'><Payments /></li>,
					<li key="2" className='header__links--item'>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="3" className='header__links--item'><a href="/api/logout">Logout</a></li>
				];
		}
	}

	render() {  
		return (	
			<div className="header">					
      	<Link to={ this.props.auth ? '/surveys' : '/' } className="header__logo">
      		servit
      	</Link>    
				<ul className="header__links"> 
					{ this.renderContent() }
				</ul>
			</div>
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