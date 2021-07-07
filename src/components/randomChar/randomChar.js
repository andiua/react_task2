import React, { Component } from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorComponent from '../error';
import './randomChar.css';

export default class RandomChar extends Component {
	constructor() {
		super();
		this.upDateChar();
	}

	gotService = new GotService();
	state = {
		char: {},
		loading: true,
		error: false
	};

	onCharLoaded = char => {
		this.setState({
			char,
			loading: false
		});
	};

	upDateChar = () => {
		const id = Math.floor(Math.random() * 140 + 25);
		this.gotService.getCharacter(id).then(char => {
			this.onCharLoaded(char);
		})
		.catch(this.onError);
	};

	onError = (err) => {
		this.setState({
			error: true,
			loading: false
		});
	}

	render() {
		console.log(this.props);
		const {
			char: { name, gender, born, died, culture }, loading, error } = this.state;

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
}
