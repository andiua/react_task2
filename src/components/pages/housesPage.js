import React, { Component } from 'react';
import withData from '../withData';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorComponent from '../error';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';
import MyContext from '../context';

export default class HousePage extends Component {

	gotService = new GotService();

	state = {
		selectedHouse: null, 
		error: false
	};

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onItemSelected = id => {
		this.setState({
			selectedHouse: id
		})
	}
	list = withData(ItemList, this.gotService.getAllHouses);
	render() {

		if(this.state.error) {
			return <ErrorComponent />
		}
		const HousesList = this.list;
		const itemList = (
			<MyContext.Provider value={{onItemSelected:this.onItemSelected,
				renderItem:({name, words}) => `${name} (${words})`}}>
				<HousesList
					 />
			</MyContext.Provider>
		);
		const houseDetails = (	
			<ItemDetails itemId={this.state.selectedHouse} getData={this.gotService.getHouse}> 
			{/* те, що в середині компонента і є this.props.children , а <Field - це просто меоді який ми імпортнули*/}
				<Field field='region' label='Region' /> 
				<Field field='words' label='Words' />
				<Field field='titles' label='Titles' />
				<Field field='overlord' label='Overlord' />
				<Field field='ancestralWeapons' label='Ancestral Weapons' />
			</ItemDetails>
		);

		return (
			<RowBlock left = {itemList} right = {houseDetails} />
		);
	}
}