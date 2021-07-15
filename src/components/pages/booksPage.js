import React, { Component } from 'react';
import withData from '../withData';
import ItemList from '../itemList';
import ErrorComponent from '../error';
import GotService from '../../services/gotService';
import { withRouter } from 'react-router-dom';

class BookPage extends Component {

	gotService = new GotService();
	list = withData(ItemList, this.gotService.getAllBooks);
	state = {
		// selectedBook: null, 
		error: false
	};

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	// onItemSelected = id => {
	// 	this.setState({
	// 		selectedBook: id
	// 	})
	// }

	render() {

		if(this.state.error) {
			return <ErrorComponent />
		}

		// const itemList = (
		// 	<ItemList
		// 		onItemSelected={this.onItemSelected} 
		// 		getData={this.gotService.getAllBooks}
		// 		renderItem={ ({name, released}) => `${name} (Year ${released.split('-')[0]} )`} />
		// );
		// const bookDetails = (	
		// 	<ItemDetails itemId={this.state.selectedBook} getData={this.gotService.getBook}> 
		// 	{/* те, що в середині компонента і є this.props.children , а <Field - це просто меоді який ми імпортнули*/}
		// 		<Field field='numberOfPages' label='Pages' />
		// 		<Field field='publisher' label='Publisher' />
		// 		<Field field='released' label='Released' />
		// 	</ItemDetails>
		// );
		const BooksList = this.list;
		return (
			// <RowBlock left = {itemList} right = {bookDetails} />
			<BooksList
				// onItemSelected={this.onItemSelected} 
				onItemSelected={ itemId => {
					// this.props.history.push(`/books/${itemId}`) //обсолютний шлях
					this.props.history.push(itemId) //відносний шлях
				}}
				renderItem={ ({name, released}) => `${name} (Year ${released.split('-')[0]} )`} />
		);
	}
}

export default withRouter(BookPage);