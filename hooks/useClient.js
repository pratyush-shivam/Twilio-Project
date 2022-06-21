import { useEffect, useState } from "react";
import { Client } from "@twilio/conversations";

export default function useClient({ token, identity, conversationSid }) {
	const [client, setClient] = useState();
	const [conversation, setConversation] = useState();

	useEffect(() => {
		console.log('check')
		const initClient = async () => {
			const client = new Client(token);
			console.log(client, token)

			client.on("stateChanged", async (state) => {
				console.log(state);
				if (state === "initialized") {
					const conversation = await client.getConversationBySid('AC5479697496c7c1fbba0f1f616b1cca32');
					await conversation.sendMessage(`${identity} joined`).then((res)=>{
						console.log('res', res);
					})
					setClient(client);
					setConversation(conversation);
				}
			});
		};
		if (token) {
			initClient();
		}
	}, [token, identity, conversationSid]);

	return [client, conversation];
}
