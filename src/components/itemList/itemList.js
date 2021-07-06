import React, {Component} from 'react';
import styled from 'styled-components';

const ItemListStyle = styled.ul`
	.list-group-item {
		cursor: pointer;
	}
`
export default class ItemList extends Component {

    render() {
        return (
            <ItemListStyle className="list-group">
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ItemListStyle>
        );
    }
}