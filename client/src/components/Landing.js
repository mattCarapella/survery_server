import React from 'react';
import '../sass/main.scss'

const Landing = () => {
	return (
		<div className="landing__header"> 
			<p className="landing__title">serv.it</p>
			<div className="landing__caption">
				<div className="landing__caption--word">feedback </div>
				<div className="landing__caption--word">collection </div>
				<div className="landing__caption--word">made  </div>
				<div className="landing__caption--word">simple </div>
			</div>
		</div>
	)
}

export default Landing;