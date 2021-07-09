import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorComponent from '../error';
import CharacterPage from '../characterPage';
import './app.css';

export default class App extends Component {

	state = {
		displayRandomChar: true, 
		error: false
	};

	componentDidCatch() {
		console.log('error');
		this.setState({
			error: true
		})
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
		const randomChar = displayRandomChar ? <RandomChar /> : null
		if(error) {
			return <ErrorComponent />
		}

		return (
			<>
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
					<CharacterPage/>
				</Container>
			</>
		);
	}
}
