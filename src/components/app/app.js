import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorComponent from '../error';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import CharacterPage from '../characterPage';
import GotService from '../../services/gotService';
import './app.css';

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
					<Row>
						<Col md="6">
							<ItemList
								getData={this.gotService.getAllBooks}
								renderItem={ (item) => item.name} //в рендер функцію можна передати jsx верстку <><span>{item.name}</span> <button>Click me</button></>)
								onCharSelected={this.onCharSelected} />
						</Col>
						<Col md="6">
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
					<Row>
						<Col md="6">
							<ItemList
								getData={this.gotService.getAllHouses}
								renderItem={ (item) => item.name}
								onCharSelected={this.onCharSelected} />
						</Col>
						<Col md="6">
							<CharDetails charId={this.state.selectedChar} />
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
