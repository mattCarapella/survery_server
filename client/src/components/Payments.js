import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return(
			<StripeCheckout 
				name="ServA"
				description="Add $5 of Credits"
				amount={500} 																					// in cents
				token={token => this.props.handleToken(token)} 				// expects callback function that is called with token received from stripe
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn btn__add-credits">Add Credits</button>
			</StripeCheckout>
		)
	}
}

export default connect(null, actions)(Payments);