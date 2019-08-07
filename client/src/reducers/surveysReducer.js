import { FETCH_SURVEYS } from '../actions/types'; 

export default function(state = [], action) {	
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload; 	// action.payload is the Survey model
		default: 	
			return state;
	}
}