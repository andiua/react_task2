import React, {Component} from 'react';
import Spinner from '../spinner';
import styled from 'styled-components';

const ItemListStyle = styled.ul`
	.list-group-item {
		cursor: pointer;
	}
`
export default class ItemList extends Component {

	state = {
		itemList: null
	}

	componentDidMount() {
		const {getData} = this.props

		getData()
			.then( itemList => {
				this.setState({
					itemList
				});
			})
	}

	renderItems(arr) {
		return arr.map( (item) => {
			const {id} = item;
			const label = this.props.renderItem(item);
			console.log(this.props);
			return (
				<li 
					key={id} 
					className="list-group-item"
					onClick={() => this.props.onCharSelected(id)}
					>
					{label}
				</li>
			)
		})
	}

    render() {

		const {itemList} = this.state;

		if(!itemList) {
			return <Spinner />
		}

		const items = this.renderItems(itemList)
        return (
            <ItemListStyle className="list-group">
				{items}
            </ItemListStyle>
        );
    }
}