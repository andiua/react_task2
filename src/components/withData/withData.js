import React, { useEffect, useState } from 'react';
import Spinner from '../spinner';
import MyContext from '../context';

const withData = (View, getData) => {
	return () => {
		const [data, updateData] = useState([]);

		useEffect(() => {
			getData().then(data => {
				updateData(data);
			});
		}, []);

		if (!data) {
			return <Spinner />;
		}
		return (
			<MyContext.Consumer>
				{value => {
					return (
						<View renderItem={value.renderItem} onItemSelected={value.onItemSelected} data={data} />
					);
				}}
			</MyContext.Consumer>
		);
	};
};
export default withData;
