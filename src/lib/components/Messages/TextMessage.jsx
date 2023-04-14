import React from "react";

const TextMessage = (props) => {
	return (
		<div className="sc-message--text">
			{<a target="_blank">{props.data.text}</a>}
		</div>
	);
};

export default TextMessage;
