<!-- Official Live Demo of peerjs of vidoe call - https://glitch.com/~peerjs-video -->

<!-- TODO: 
 

How this works for now: Open webstie in two tabs:
1st tab:
	- Copy peerid from second tab to this tab to connect.
	- Now pick a file and play the video and now you need to click on play.
	- For now there is bug i..e, you do need to press the play button on the second tab to be able to play it there.

	TODO:
	1. Fix the bugs while playing videos and make it robust. 

	TODO:
	2. Since we can load mp3 files in <video> tag as confirmed by chatgpt here - https://chatgpt.com/c/67acf84b-16b4-8007-8d8c-559793798643
	thus we can implement that so that we can listen to long mp3 files as well for e.gc., long lecutres of osho listening with people.

	TODO:
	3. Make solution for subtitles: Check if including subtitles stream subtitles as well?
	Also check if you can write subtitles to movie directly so its not a problem at all to inclucde the subtitle to the movie.


	TODO:
	4. I would need to make call independently to multiple peers like below so that more than 2 people can also watch together.
	The reason its not doable natively with peerjs because webrtc itself doesn't support one to many communication (check below chatgpt answer).
	Q. Does webrtc supports one to many communication? --- https://chatgpt.com/c/67acf6a2-2a04-8007-b2e9-db5e89c3e398
	Implementing hints from ChatGPT - https://chatgpt.com/c/67acf5d0-2478-8007-a94b-8fa1ae4d494f
		* Related code:
		===============
	    peerIDs.forEach((peerId) => {
			const call = peer.call(peerId, stream);
			call.on('stream', (remoteStream) => {
				addVideoStream(remoteStream);
			});
		}

-->

<script lang="ts">
	import { onMount } from 'svelte';
	import Peer from 'peerjs';
	import type { DataConnection } from 'peerjs';

	const VIDEO_EVENTS = {
		PLAY_VIDEO: '5e9bbd2b-592c-4a46-bf47-66d1401b9049',
		PAUSE_VIDEO: '1ea7e748-f5fd-4714-a1ae-139d2942f2ff'
	};
	const isVideoEvent = (data: string) => Object.values(VIDEO_EVENTS).includes(data);

	// video watching together
	let localVideoEl: any;
	let receivingVideoEl: any;
	let localStream: any;
	//
	let hideLocalVideoEl: boolean = $state(true);
	let hideReceivingVideoEl: boolean = $state(true);

	let selfPeerId = $state(''); // `peer.id` when peer is assigned an id
	let friendPeerId = $state('');

	let selfPeer: Peer;
	let friendConnection: DataConnection;

	let message = $state('');
	let messages = $state<string[]>([]);

	const addToMessageList = (peerId: string, message: string) => {
		messages.push(`${peerId}: ${message}`);
	};
	const CONNECTION_SUCCESS_GREETING = 'Connection Successful.';

	const connectToFriend = () => {
		try {
			friendConnection = selfPeer.connect(friendPeerId);
			friendConnection.on('open', () => {
				addToMessageList(friendConnection.peer, CONNECTION_SUCCESS_GREETING);
			});

			friendConnection.on('data', (data: any) => {
				if (isVideoEvent(data)) {
					handleVideoEvent(data);
				} else {
					addToMessageList(friendConnection.peer, data);
				}
			});
		} catch (error) {
			console.log('ERROR_connectToFriend?', error);
		}
	};

	onMount(() => {
		// Create a peer
		selfPeer = new Peer(); // (You can pass your own id or omit the id if you want to get a random one from the server.)
		selfPeer.on('open', (id) => (selfPeerId = id));

		// Below event is executed when someone else connectes to this peer
		selfPeer.on('connection', (con) => {
			friendConnection = con;
			console.log(`A peer connected to me of peer Id: ${friendConnection.peer}`); // (also - con.connectionId)
			friendPeerId = friendConnection.peer;
			addToMessageList(friendConnection.peer, CONNECTION_SUCCESS_GREETING);
			friendConnection.on('data', (data: any) => {
				if (isVideoEvent(data)) {
					handleVideoEvent(data);
				} else {
					addToMessageList(friendConnection.peer, data);
				}
			});
		});

		// Below event is executed when someone else calls this peer via `peer.call(..)` --- [When receiving a call]
		selfPeer.on('call', (incomingCall) => {
			incomingCall.answer(localStream);
			incomingCall.on('stream', (remoteStream) => {
				receivingVideoEl.srcObject = remoteStream;
				hideReceivingVideoEl = false;
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
		hideLocalVideoEl = false;

		// Ensure the file is loaded in <video> element before getting the video stream from it
		localVideoEl.onloadedmetadata = () => {
			// localVideoEl.play(); // Start playing

			// Capture the media stream from the video element
			localStream = localVideoEl.captureStream(); // Learn: The captureStream() function captures a live media stream from an HTML <video> or <canvas> element and returns a MediaStream that can be used with WebRTC, PeerJS, or other APIs like MediaRecorder.
			// Now you can send localStream using PeerJS (make sure connection is ready i..e, peer.on('connection') has been called)
			selfPeer.call(friendPeerId, localStream);
		};
	}

	const onPlayLocalVideoEl = (e: any) => {
		friendConnection.send(VIDEO_EVENTS.PLAY_VIDEO);
	};
	const onPauseLocalVideoEl = (e: any) => {
		friendConnection.send(VIDEO_EVENTS.PAUSE_VIDEO);
	};

	function handleVideoEvent(data: string) {
		const isPlayingInLocalVideoEl = !hideLocalVideoEl;
		const isPlayingInReceivingVideoEl = !hideReceivingVideoEl;
		if (data === VIDEO_EVENTS.PAUSE_VIDEO) {
			if (isPlayingInLocalVideoEl) {
				localVideoEl.pause();
			}
			if (isPlayingInReceivingVideoEl) {
				receivingVideoEl.pause();
			}
		}
		if (data === VIDEO_EVENTS.PLAY_VIDEO) {
			if (isPlayingInLocalVideoEl) {
				localVideoEl.play();
			}
			if (isPlayingInReceivingVideoEl) {
				receivingVideoEl.play();
			}
		}
	}
</script>

<section class="p-2">
	<h1 class="text-3xl font-bold">WebRTC Demo using Peerjs (no backend)</h1>

	{#if selfPeerId}
		<div>
			<div>My PeerId: {selfPeerId}</div>
			<div class="italic text-gray-500">
				(Use this PeerId to connect from another browser tab/device)
			</div>
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

<h2 class="text-3xl font-bold">Video Streaming of local video files with PeerJS</h2>
<div class="text-xs italic">
	Note to users: This service is purposely made for people to watch their locally downloaded files
	with a friend currently. (more than 2 people is not allowed at the moment but will be done in
	future).
</div>

<input onchange={handleFile} type="file" id="videoFile" accept="video/*" />
<!-- Note to Sahi: Putting below video element inside the <section> tag give me some weird error (might be related to some hydration related issue in svelte) -->
<video
	bind:this={localVideoEl}
	onplay={onPlayLocalVideoEl}
	onpause={onPauseLocalVideoEl}
	controls
	style={`display: ${hideLocalVideoEl ? 'none' : 'block'};`}
>
	<track kind="captions" />
</video>
<video
	bind:this={receivingVideoEl}
	onplay={onPlayLocalVideoEl}
	onpause={onPauseLocalVideoEl}
	controls
	style={`display: ${hideReceivingVideoEl ? 'none' : 'block'};`}
>
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
