import React, { Component } from 'react';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorComponent from '../error';
import './randomChar.css';

export default class RandomChar extends Component {

	gotService = new GotService();
	state = {
		char: {},
		loading: true,
		error: false
	};
	static defaultProps = { //щоб задати дефолтні пропси. прописуємо в компоненті властивість defaultProps. це нова можливість es9
		interval: 1000
	}
	static propTypes = {
		interval: (props, propName, componentName) => {
			const value = props[propName];

			if (typeof value === 'number' && !isNaN(value)){
				return null;
			}
			return new TypeError(`${componentName}: ${propName} must be a number`);
		}
	}

	componentDidMount() { //викликається як компонент закічив рендитиритись після 1 ініціалізації
		this.upDateChar();
		this.timerId = setInterval(this.upDateChar, this.props.interval);
	}

	componentWillUnmount() {//викликається перед видаленням компонента
		clearTimeout(this.timerId);
	}

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

// RandomChar.defaultProps = { //щоб задати дефолтні пропси. прописуємо в компоненті властивість defaultProps
// 	interval: 1000
// }