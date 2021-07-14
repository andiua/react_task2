import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorComponent from '../error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

	gotService = new GotService();
	
	state = {
		selectedChar: null, 
		error: false
	};

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onItemSelected = id => {
		this.setState({
			selectedChar: id
		})
	}

	render() {

		if(this.state.error) {
			return <ErrorComponent />
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected} 
				getData={this.gotService.getAllCharacters}
				renderItem={ ({name, gender}) => `${name} (${gender})`} /> //в рендер функцію можна передати jsx верстку <><span>{item.name}</span> <button>Click me</button></>)
		);
		const charDetails = (	
			<ItemDetails itemId={this.state.selectedChar} getData={this.gotService.getCharacter}> 
			{/* те, що в середині компонента і є this.props.children , а <Field - це просто меоді який ми імпортнули*/}
				<Field field='gender' label='Gender' /> 
				<Field field='born' label='Born' />
				<Field field='died' label='Died' />
				<Field field='culture' label='Culture' />
			</ItemDetails>
		);

		return (
			<RowBlock left = {itemList} right = {charDetails} />
		);
	}
}
