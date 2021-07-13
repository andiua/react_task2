import React, {Component} from 'react';
import GotService from '../../services/gotService';
import styled from 'styled-components';

const ItemDetailsStyle = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
	h4{
		margin-bottom: 20px;
		text-align: center;
	}
`;
const Field = ({field, label, item}) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	)
}
export {Field}; 

export default class ItemDetails extends Component {

	gotService = new GotService();
	state = {
		item: null
	}

	componentDidMount() {
		this.upDateItem();
	}

	componentDidUpdate(prevProps) {
		if(this.props.itemId !== prevProps.itemId) { //цю перевірку треба завжди робити
			this.upDateItem();
		}
	}

	upDateItem() {
		const {itemId, getData} = this.props;
		if(!itemId) {
			return;
		}

		getData(itemId)
			.then(item => {
				this.setState({item});
			})
	}

    render() {
		if(!this.state.item) {
			return <span className="select-error">Please select a character</span>
		}
		const {item} = this.state;
		const {name} = item;
        return (
            <ItemDetailsStyle className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
					{
						//перебираємо кожен Field через метод Реакта
						React.Children.map(this.props.children, child => {  
							return React.cloneElement(child, {item} )
						})
					}
                </ul>
            </ItemDetailsStyle>
        );
    }
}