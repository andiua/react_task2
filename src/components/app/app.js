import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorComponent from '../error';
import { CharacterPage, BookPage, HousePage, BookItem } from '../pages';
import './app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App () {
	const [displayRandomChar, toggleRandomChar] = useState(true)
	const [error, onError] = useState(false)
	useEffect(() => {
		return () => { //Component DIDCATCH в return передавати у ФУНКЦІЮ!
			console.log('error');
			onError(true) // новий стан передаєтья або як аргумент, або як результат функції
		}
	})

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
							<Button onClick={() => toggleRandomChar(!displayRandomChar)} className="toggle-random" color="secondary">
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
export default App;