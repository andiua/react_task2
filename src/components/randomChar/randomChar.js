import React, { useState, useEffect } from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorComponent from '../error';
import './randomChar.css';

function RandomChar({interval = 1000} ) {

	const gotService = new GotService();
	const [char, onCharLoaded] = useState({});
	const [loading, onLoaded] = useState(true);
	const [error, onError] = useState(false);

	if (typeof interval !== 'number' && isNaN(interval)){
		return new TypeError(`RandomChar: ${interval} must be a number`);
	}

	useEffect( () => {
		upDateChar();
		let timerId = setInterval(upDateChar, interval);
		onLoaded(false);
		return () => {
			clearTimeout(timerId);
		}
	}, [interval]) 
	function upDateChar() {
		const id = Math.floor(Math.random() * 140 + 25);
		gotService.getCharacter(id).then(newChar => {
			onCharLoaded(newChar);
		})
		.catch(() => {
			onError(true);
		});
	};

	const { name, gender, born, died, culture } = char;

	if (loading) {
		return (
			<div className="random-block rounded">
				<Spinner />
			</div>
		);
	}

	if(error) {
		return (
			<div className="random-block rounded">
				<ErrorComponent />
			</div>
		)
	}

	return (
		<div className="random-block rounded">
			<h4>Random Character: {name}</h4>
			<ul className="list-group list-group-flush">
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Gender </span>
					<span>{gender}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Born </span>
					<span>{born}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Died </span>
					<span>{died}</span>
				</li>
				<li className="list-group-item d-flex justify-content-between">
					<span className="term">Culture </span>
					<span>{culture}</span>
				</li>
			</ul>
		</div>
	);
}
export default RandomChar;
// RandomChar.defaultProps = { //щоб задати дефолтні пропси. прописуємо в компоненті властивість defaultProps
// 	interval: 1000
// }