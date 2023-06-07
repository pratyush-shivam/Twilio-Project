
import axios from "axios";
import { useState } from "react";
import LogIn from "../components/logIn";
import MessageList from "../components/MessageList";

export default function Home() {
	const [identity, setIdentity] = useState("");
	const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2VlMzNlNTYxYmY5NzEyYjMzOGRjYTc3YzY1NDRlZmQ2LTE2NTU3OTU0OTUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IjRiNTAzYjkyLThiNTUtNDZlMS1iZDkzLTU2NmUzYzgyYjcyMCJ9fSwiaWF0IjoxNjU1Nzk1NDk1LCJleHAiOjE2NTU3OTkwOTUsImlzcyI6IlNLZWUzM2U1NjFiZjk3MTJiMzM4ZGNhNzdjNjU0NGVmZDYiLCJzdWIiOiJBQzU0Nzk2OTc0OTZjN2MxZmJiYTBmMWY2MTZiMWNjYTMyIn0.wVolsaO0eKVddZjBf5jeBseIib43kUfi9hnmkcf3HwA');
	const [loading, setLoading] = useState(false);
	const [conversationSid, setConversationSid] = useState();

	const getToken = async (e) => {
		e.preventDefault();
		setLoading(true);
		// create new conversation
		const conversation = await axios.get("/api/createConversation");
		const { chatServiceSid, sid } = conversation.data.conversation;
		setConversationSid(sid);

		// add participant to conversation
		await axios.get(`/api/addParticipant?sid=${sid}&identity=${identity}`);

		// get token for participant
		const token = await axios.get(`/api/getToken?sid=${chatServiceSid}&identity=${identity}`);
		setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2VlMzNlNTYxYmY5NzEyYjMzOGRjYTc3YzY1NDRlZmQ2LTE2NTU3OTU0OTUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IjRiNTAzYjkyLThiNTUtNDZlMS1iZDkzLTU2NmUzYzgyYjcyMCJ9fSwiaWF0IjoxNjU1Nzk1NDk1LCJleHAiOjE2NTU3OTkwOTUsImlzcyI6IlNLZWUzM2U1NjFiZjk3MTJiMzM4ZGNhNzdjNjU0NGVmZDYiLCJzdWIiOiJBQzU0Nzk2OTc0OTZjN2MxZmJiYTBmMWY2MTZiMWNjYTMyIn0.wVolsaO0eKVddZjBf5jeBseIib43kUfi9hnmkcf3HwA');

		setLoading(false);
		// This is for the edit for related to the changes of the website
	};

	return (
		<main>
			<h1>Next.js - Twilio Conversations</h1>
			{!token && <LogIn identity={identity} setIdentity={setIdentity} getToken={getToken} loading={loading} />}
			{<MessageList token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2VlMzNlNTYxYmY5NzEyYjMzOGRjYTc3YzY1NDRlZmQ2LTE2NTU3OTU0OTUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IjRiNTAzYjkyLThiNTUtNDZlMS1iZDkzLTU2NmUzYzgyYjcyMCJ9fSwiaWF0IjoxNjU1Nzk1NDk1LCJleHAiOjE2NTU3OTkwOTUsImlzcyI6IlNLZWUzM2U1NjFiZjk3MTJiMzM4ZGNhNzdjNjU0NGVmZDYiLCJzdWIiOiJBQzU0Nzk2OTc0OTZjN2MxZmJiYTBmMWY2MTZiMWNjYTMyIn0.wVolsaO0eKVddZjBf5jeBseIib43kUfi9hnmkcf3HwA'} conversationSid={'AC5479697496c7c1fbba0f1f616b1cca32'} identity={'user@example.com'} />}
		</main>
	);
}
