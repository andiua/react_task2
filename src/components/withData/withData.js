import React, { useEffect, useState } from 'react';
import Spinner from '../spinner';

const withData = (View, getData, prop) => {
	return () => {
		const [data, updateData] = useState([])
	
		useEffect( () => {
			getData()
			.then( data => {
				updateData(data)
			})
		}, [])

		if(!data) {
			return <Spinner />
		}
		return <View {...prop} data={data}/>;
	};
}
export default withData;