<script lang="ts">
	import { onMount } from 'svelte';
	import Peer from 'peerjs';
	import type { DataConnection } from 'peerjs';

	let peerId = $state(''); // `peer.id` when peer is assigned an id
	let friendPeerId = $state('');

	let peer: Peer;
	let friendConnection: DataConnection;

	let message = $state('');
	let messages = $state<string[]>([]);

	const addToMessageList = (peerId: string, message: string) => {
		messages.push(`${peerId}: ${message}`);
	};
	const connectionSuccessfulGreet = 'Connection Successful.';

	const connectToFriend = () => {
		try {
			friendConnection = peer.connect(friendPeerId);
			friendConnection.on('open', () => {
				addToMessageList(friendConnection.peer, connectionSuccessfulGreet);
			});

			friendConnection.on('data', (data: any) => {
				addToMessageList(friendConnection.peer, data);
			});
		} catch (error) {
			console.log('ERROR_connectToFriend?', error);
		}
	};

	onMount(() => {
		// Create a peer
		peer = new Peer(); // (You can pass your own id or omit the id if you want to get a random one from the server.)
		peer.on('open', (id) => (peerId = id));

		// Below event is executed when someone else connectes to this peer
		peer.on('connection', (con) => {
			friendConnection = con;
			console.log(`A peer connected to me of peer Id: ${friendConnection.peer}`); // (also - con.connectionId)
			addToMessageList(friendConnection.peer, connectionSuccessfulGreet);
			friendConnection.on('data', (data: any) => {
				addToMessageList(friendConnection.peer, data);
			});
		});
	});

	const sendMessage = () => {
		friendConnection.send(message);
		message = '';
	};
</script>

<section class="p-2">
	<h1 class="text-3xl font-bold">WebRTC Demo using Peerjs (no backend)</h1>

	My PeerId: {peerId}
	<div class="">
		<input class="input" bind:value={friendPeerId} placeholder="Enter friend's peer id" />
		<br />
		<button class="btn" disabled={!friendPeerId} onclick={connectToFriend}>Connect</button>
	</div>

	<h3 class="mt-4 text-xl font-bold">Received Messages</h3>
	{#each messages as message}
		<li>{message}</li>
	{/each}

	<input
		class="input"
		onkeypress={(e: any) => {
			if (e.key === 'Enter') {
				sendMessage();
			}
		}}
		bind:value={message}
		placeholder="Enter message (Enter to send)"
	/>
	<button class="btn" onclick={sendMessage}>Send</button>
</section>

<style>
	.btn {
		padding: 0px 10px;
		font-size: 0.7rem;
		border: 1px solid black;
	}
	.input {
		border: 1px solid black;
		height: 22px;
		width: 250px;
		padding: 8px 12px;
	}
</style>
