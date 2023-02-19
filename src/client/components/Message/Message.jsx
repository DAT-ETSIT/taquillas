import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import { removeMessage } from '../../redux/actions/messages';
import './styles.css';

function Message() {
	const messages = useSelector((state) => state.messages);
	const [data, setData] = useState({
		isActive: false,
		title: '',
		text: '',
		type: '',
	});
	const { dispatch } = store;

	useEffect(() => {
		if (messages.length > 0) {
			const message = messages[0];
			const isError = 'error' in message;
			setData({
				isActive: true,
				title: isError ? 'Error' : message.title,
				text: message.message,
				type: isError ? 'error' : 'info',
			});
		} else {
			setData({
				isActive: false,
				text: '',
				type: '',
				title: '',
			});
		}
	}, [messages]);

	const discardMessage = () => {
		setData({ ...data, isActive: false });
		dispatch(removeMessage());
	};

	const modal = (
		<div className="shadow show">
			<div className={`mainModal show zoom ${data.type}`}>
				<div className="modalTitle">{data.title}</div>
				<div className="modalText">{data.text}</div>
				<br />
				<button type="button" onClick={discardMessage}>Aceptar</button>
			</div>
		</div>
	);

	if (data.isActive) return modal;
	return null;
}

export default Message;
