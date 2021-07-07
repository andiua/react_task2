import React from 'react';
import styled from 'styled-components';

const ErrorStyle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const ErrorComponent = () => {
	return (
		<ErrorStyle>
			<p>Something goes wrong. Try again later</p>
		</ErrorStyle>
	);
};
export default ErrorComponent;
