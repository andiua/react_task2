import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorComponent from '../error';
import { CharacterPage, BookPage, HousePage, BookItem } from '../pages';
import GotService from '../../services/gotService';
import './app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {
	gotService = new GotService();
	state = {
		displayRandomChar: true,
		error: false
	};

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		});
	}

	toggleRandomChar = () => {
		this.setState(preState => {
			return {
				displayRandomChar: !preState.displayRandomChar
			};
		});
	};

	render() {
		const { displayRandomChar, error } = this.state;
		const randomChar = displayRandomChar ? <RandomChar interval={4000} /> : null;
		if (error) {
			return <ErrorComponent />;
		}

		return (
			<Router>
				<div className="app">
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 5, offset: 0 }}>
								{randomChar}
								{/* <RandomChar display={displayRandomChar} />  моє не ненайкраще виконання*/}
								<Button onClick={this.toggleRandomChar} className="toggle-random" color="secondary">
									Toggle random character
								</Button>
							</Col>
						</Row>
						<Route path='/characters' exact component={CharacterPage}/>
						<Route path='/houses' exact component={HousePage}/>
						<Route path='/books' exact component={BookPage}/>
						<Route path='/books/:id' exact render={ ({match}) => {
							const {id} = match.params;
							return <BookItem bookId={id} />
						}}/>
					</Container>
				</div>
			</Router>
		);
	}
}
