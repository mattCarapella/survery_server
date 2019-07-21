import React from 'react'; 
import '../../sass/main.scss';

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
			<div className="field__error">{touched && error}</div>
		</div>
	)
}
