import PropTypes from "prop-types";
import React, { useMemo, useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import launcherIcon from "@/assets/logo-no-bg.svg";
import incomingMessageSound from "@/assets/sounds/notification.mp3";
import launcherIconActive from "@/assets/close-icon.png";

const Launcher = (props) => {
	const [isOpen, setIsOpen] = useState(props.isOpen ? props.isOpen : false);

	const playIncomingMessageSound = () => {
		var audio = new Audio(incomingMessageSound);
		audio.play();
	};

	useEffect(() => {
		if (props.mute) return;
		const nextMessage = props.messageList[props.messageList.length - 1];
		const isIncoming = (nextMessage || {}).author === "them";
		const isNew = props.messageList.length > props.messageList.length;
		if (isIncoming && isNew) {
			playIncomingMessageSound();
		}
	}, [JSON.stringify(props.messageList)]);

	const handleClick = (args) => {
		if (props.handleClick) return props.handleClick(args);
		else setIsOpen(!isOpen);
	};

	const classList = useMemo(
		() => ["sc-launcher", isOpen ? "opened" : ""],
		[isOpen]
	);

	return (
		<div id="sc-launcher">
			<div className={classList.join(" ")} onClick={handleClick}>
				<MessageCount count={props.newMessagesCount} isOpen={isOpen} />
				<img className={"sc-open-icon"} src={launcherIconActive} />
				<img className={"sc-closed-icon"} src={launcherIcon} />
			</div>
			<ChatWindow
				messageList={props.messageList}
				onUserInputSubmit={props.onMessageWasSent}
				onFilesSelected={props.onFilesSelected}
				agentProfile={props.agentProfile}
				isOpen={isOpen}
				onClose={handleClick}
				showEmoji={props.showEmoji}
			/>
		</div>
	);
};

const MessageCount = (props) => {
	if (props.count === 0 || props.isOpen === true) {
		return null;
	}
	return <div className={"sc-new-messages-count"}>{props.count}</div>;
};

Launcher.propTypes = {
	onMessageWasReceived: PropTypes.func,
	onMessageWasSent: PropTypes.func,
	newMessagesCount: PropTypes.number,
	isOpen: PropTypes.bool,
	handleClick: PropTypes.func,
	messageList: PropTypes.arrayOf(PropTypes.object),
	mute: PropTypes.bool,
	showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
	newMessagesCount: 0,
	showEmoji: true,
};

export default Launcher;
