import React, { useState } from "react";
import renderer from "react-test-renderer";
import { describe, expect, test } from "vitest";
import { Launcher } from "./index";

const App = () => {
	const [messageList, setMessageList] = useState([]);
	const _onMessageWasSent = (message) => {
		setMessageList([...messageList, message]);
	};
	return (
		<>
			<Launcher
				agentProfile={{
					teamName: "react-chat-window",
					imageUrl:
						"https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
				}}
				onMessageWasSent={_onMessageWasSent}
				messageList={messageList}
				showEmoji
			/>
		</>
	);
};

describe("HelloWorld", () => {
	test("HelloWorld component renders correctly", () => {
		const component = renderer.create(<App />);

		const tree = component.toJSON();

		expect(tree).toMatchSnapshot();
	});
});
