import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
	return (
		<div className="header">
			<ul className="header-ul">
				<Link className="link" to="/"><li className="header-li logo">Frendo</li></Link>
				<Link className="link" to="/signup"><li className="header-li">Sign Up</li></Link>
				<Link className="link" to="/signin"><li className="header-li">Sign In</li></Link>
			</ul>
		</div>
	);
}