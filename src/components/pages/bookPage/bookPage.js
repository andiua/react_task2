import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorComponent from '../../error';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component {

	gotService = new GotService();

	state = {
		selectedBook: null, 
		error: false
	};

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onItemSelected = id => {
		this.setState({
			selectedBook: id
		})
	}

	render() {

		if(this.state.error) {
			return <ErrorComponent />
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected} 
				getData={this.gotService.getAllBooks}
				renderItem={ ({name, released}) => `${name} (Year ${released.split('-')[0]} )`} />
		);
		const bookDetails = (	
			<ItemDetails itemId={this.state.selectedBook} getData={this.gotService.getBook}> 
			{/* те, що в середині компонента і є this.props.children , а <Field - це просто меоді який ми імпортнули*/}
				<Field field='numberOfPages' label='Pages' />
				<Field field='publisher' label='Publisher' />
				<Field field='released' label='Released' />
			</ItemDetails>
		);

		return (
			<RowBlock left = {itemList} right = {bookDetails} />
		);
	}
}