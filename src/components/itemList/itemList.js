import React from 'react';
import styled from 'styled-components';


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

export default ItemList;