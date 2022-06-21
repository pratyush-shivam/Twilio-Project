import { useState, useEffect } from "react";
import useClient from "../hooks/useClient";

export default function MessageList({ token, identity, conversationSid }) {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const [client, conversation] = useClient({ token, identity, conversationSid });

	useEffect(() => {
		const getMessages = async () => {
			const messages = await conversation.getMessages();
			setMessages(messages.items);
		};

		if (conversation) {
			conversation.on("messageAdded", getMessages);
		}

		return () => {
			if (conversation) {
				conversation.removeListener("messageAdded", getMessages);
			}
		};
	}, [conversation]);

	const sendMessage = async (e) => {
		setLoading(true);
		e.preventDefault();
		await conversation.sendMessage(message);
		setMessage("");
		setLoading(false);
	};

	return (
		<div>
			<h1>Messages</h1>
			<ul>
				{messages.map((message) => (
					<li key={message.state.index}>
						💬 <strong>{message.state.author}</strong>: {message.state.body}
					</li>
				))}
				<li key='dfd'>
						💬 <strong>Pratyush Shivam</strong>: How are you
					</li>
					<li key='dfd'>
						💬 <strong>Name 3</strong>: Message 2
					</li>
					<li key='dfd'>
						💬 <strong>Pratyush Shivam</strong>: Message 4
					</li>
				
			</ul>
			{true && (
				<form onSubmit={(e) => sendMessage(e)}>
					<input type={"text"} value={message} onChange={(e) => setMessage(e.target.value)} readOnly={loading} />
					<button type="submit" disabled={loading}>
						{loading ? "Sending" : "Send message"}
					</button>
				</form>
			)}
		</div>
	);
}
