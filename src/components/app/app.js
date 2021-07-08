import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import './app.css';

export default class App extends Component {

	state = {
		displayRandomChar: true, 
		selectedChar: 135
	};

	toggleRandomChar = () => {
		this.setState(preState => {
			return { 
				displayRandomChar: !preState.displayRandomChar 
			};
		});
	};

	onCharSelected = id => {
		this.setState({
			selectedChar: id
		})
	}

	render() {
		const { displayRandomChar } = this.state;
		const randomChar = displayRandomChar ? <RandomChar /> : null
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
					<Row>
						<Col md="6">
							<ItemList onCharSelected={this.onCharSelected}/>
						</Col>
						<Col md="6">
							<CharDetails charId = {this.state.selectedChar}/>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
