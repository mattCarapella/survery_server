import axios from 'axios';
import { FETCH_USER } from './types'; 

// ********************************************************************
//            		 Action Creator
// ********************************************************************

// export const fetchUser = () => {
// 	return function(dispatch) {
// 		axios.get('/api/current_user')	
// 			.then(res => dispatch({ type: FETCH_USER, payload: res })); // after we get a response, dispatch it
// 	};
// };

// REFACTORED
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data }); 
};


  