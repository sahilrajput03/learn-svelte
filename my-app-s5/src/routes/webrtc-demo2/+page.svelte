<!-- src: https://www.npmjs.com/package/peerjs -->
<!-- TODO: Note above has code to send video media as well (TODO) - make demo of that as well. -->
<!-- Official Live Demo of peerjs of vidoe call - https://glitch.com/~peerjs-video -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Peer from 'peerjs';
	import type { DataConnection } from 'peerjs';

	// video watching together
	let localVideoEl: any;
	let remoteVideoEl: any;
	let localStream: any;
	//

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

		// Below event is executed when someone else calls this peer via `peer.call(..)` --- [When receiving a call]
		peer.on('call', (call) => {
			call.answer(localStream);
			call.on('stream', (remoteStream) => {
				remoteVideoEl.srcObject = remoteStream;
			});
		});
	});

	const sendMessage = () => {
		friendConnection.send(message);
		message = '';
	};

	function handleFile(event: any) {
		const file = event.target.files[0];
		if (!file) return;

		const fileURL = URL.createObjectURL(file);
		localVideoEl.src = fileURL;

		// Ensure the video is loaded before getting the stream
		localVideoEl.onloadedmetadata = () => {
			// localVideoEl.play(); // Start playing

			// Capture the media stream from the video element
			localStream = localVideoEl.captureStream(); // Learn: The captureStream() function captures a live media stream from an HTML <video> or <canvas> element and returns a MediaStream that can be used with WebRTC, PeerJS, or other APIs like MediaRecorder.
			// Now you can send localStream using PeerJS (make sure connection is ready i..e, peer.on('connection') has been called)
			const call = peer.call(friendPeerId, localStream);
			call.on('stream', (remoteStream) => {
				remoteVideoEl.srcObject = remoteStream;
			});
		};
	}
</script>

<section class="p-2">
	<h1 class="text-3xl font-bold">WebRTC Demo using Peerjs (no backend)</h1>

	{#if peerId}
		<div>
			<div>My PeerId: {peerId}</div>
			<div class="italic text-gray-500">(Use this PeerId to connect from another device)</div>
		</div>
	{:else}
		<div class="italic">Generating peer id...</div>
		<div>&nbsp;</div>
	{/if}

	<div class="mt-8">
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
<br />
<br />

<h2>Video Streaming with PeerJS</h2>
<input onchange={handleFile} type="file" id="videoFile" accept="video/*" />
<video bind:this={localVideoEl} controls>
	<track kind="captions" />
</video>
<video bind:this={remoteVideoEl} controls>
	<track kind="captions" />
</video>

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
