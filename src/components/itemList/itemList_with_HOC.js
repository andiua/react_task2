import React, {Component} from 'react';
import Spinner from '../spinner';
import styled from 'styled-components';
import GotService from '../../services/gotService';

const ItemListStyle = styled.ul`
	.list-group-item {
		cursor: pointer;
	}
`
const ItemList = ({renderItem, onItemSelected, data}) => {

	const renderItems = (arr) => {

		return arr.map( (item) => {
			const {id} = item;
			const label = renderItem(item);
			return (
				<li 
					key={id} 
					className="list-group-item"
					onClick={() => onItemSelected(id)}
					>
					{label}
				</li>
			)
		})
	}

    	const items = renderItems(data)
        return (
            <ItemListStyle className="list-group">
				{items}
            </ItemListStyle>
        );
    
}

const withData = (View, getData) => {
	return class extends Component {

		state = {
			data: null
		}
	
		componentDidMount() {
			getData()
				.then( data => {
					this.setState({
						data
					});
				})
		}
		render() {
			
			const {data} = this.state;

			if(!data) {
				return <Spinner />
			}

			return <View {...this.props} data={this.state.data}/>;
		}
	};
}
const gotService = new GotService(); //передаємо метод з сервісу АПІ як аргумент
export default withData(ItemList, gotService.getAllCharacters);