<!-- Official Live Demo of peerjs of vidoe call - https://glitch.com/~peerjs-video -->

<script lang="ts">
	import { onMount } from 'svelte';
	import Peer from 'peerjs';
	import type { DataConnection } from 'peerjs';

	const VIDEO_EVENT = {
		PLAY_VIDEO: '5e9bbd2b-592c-4a46-bf47-66d1401b9049',
		PAUSE_VIDEO: '1ea7e748-f5fd-4714-a1ae-139d2942f2ff'
	};
	const isVideoEventFn = (data: any) => Object.values(VIDEO_EVENT).includes(data?.videoEvent);

	type VideoEventType = {
		videoEvent: string;
		currentTime?: number;
		duration?: number;
	};

	// seekbar for `receivingVideoEl`
	let seekValueOfReceivingVideoEl = $state(0); // Initial value
	let maxSeekValueOfReceivingVideoEl = $state(100);

	// video watching together
	let localVideoEl: any;
	let receivingVideoEl: any;
	let localStream: any;
	//
	let hideLocalVideoEl: boolean = $state(true);
	let hideReceivingVideoEl: boolean = $state(true);
	const isPlayingInLocalVideoEl = $derived(!hideLocalVideoEl);
	const isPlayingInReceivingVideoEl = $derived(!hideReceivingVideoEl);

	let isReceivingVideoPaused = $state(true);
	let receivingVideoTimeTicker: any = null;

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
				if (isVideoEventFn(data)) {
					handleVideoEventFromFriendConn(data);
				} else {
					addToMessageList(friendConnection.peer, data);
				}
			});
		} catch (error) {
			console.log('ERROR_connectToFriend?', error);
		}
	};

	onMount(() => {
		// TEMP vvvv
		// Set these manually in each tab:
		// sessionStorage.setItem('id', "4c19ccd0-1fdd-45a1-9c36-a07b5feec062") // tab 1
		// sessionStorage.setItem('id', "7f775bc4-f2eb-4eeb-97c8-9b323fa1cecc") // tab 2

		// selfPeerId = sessionStorage.getItem('id') ?? '';
		// selfPeer = new Peer(selfPeerId); // (You can pass your own id or omit the id if you want to get a random one from the server.)
		// TEMP ^^^^

		// Create a peer
		// (commenting below line in favor to assignign my own ids to peers for faster testing)
		selfPeer = new Peer(); // (You can pass your own id or omit the id if you want to get a random one from the server.)
		selfPeer.on('open', (id) => (selfPeerId = id));

		// Below event is executed when someone else connectes to this peer
		selfPeer.on('connection', (con) => {
			friendConnection = con;
			console.log(`A peer connected to me of peer Id: ${friendConnection.peer}`); // (also - con.connectionId)
			friendPeerId = friendConnection.peer;
			addToMessageList(friendConnection.peer, CONNECTION_SUCCESS_GREETING);
			friendConnection.on('data', (data: any) => {
				if (isVideoEventFn(data)) {
					handleVideoEventFromFriendConn(data);
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

	const onPlay = (e: any) => {
		if (isPlayingInLocalVideoEl) {
			localVideoEl.currentTime -= 2; // play from 2 seconds before to cover for loss of streaming packets when recontinuing.
			friendConnection.send({
				videoEvent: VIDEO_EVENT.PLAY_VIDEO,
				currentTime: localVideoEl?.currentTime,
				duration: localVideoEl?.duration
			} as VideoEventType);
		}
		if (isPlayingInReceivingVideoEl) {
			friendConnection.send({ videoEvent: VIDEO_EVENT.PLAY_VIDEO } as VideoEventType);
		}
	};
	const onPause = (e: any) => {
		if (isPlayingInLocalVideoEl) {
			friendConnection.send({
				videoEvent: VIDEO_EVENT.PAUSE_VIDEO,
				currentTime: localVideoEl?.currentTime,
				duration: localVideoEl?.duration
			} as VideoEventType);
		}
		if (isPlayingInReceivingVideoEl) {
			friendConnection.send({ videoEvent: VIDEO_EVENT.PAUSE_VIDEO } as VideoEventType);
		}
	};

	function handleVideoEventFromFriendConn(data: VideoEventType) {
		console.log('handleVideoEventFromFriendConn-data?', data);
		if (data.videoEvent === VIDEO_EVENT.PAUSE_VIDEO) {
			if (isPlayingInLocalVideoEl) {
				localVideoEl.pause();
			}
			if (isPlayingInReceivingVideoEl) {
				// isReceivingVideoPaused = true;
				receivingVideoEl.pause();
				seekValueOfReceivingVideoEl = data.currentTime ?? 0;
				maxSeekValueOfReceivingVideoEl = data.duration ?? 100;
			}
		}
		if (data.videoEvent === VIDEO_EVENT.PLAY_VIDEO) {
			if (isPlayingInLocalVideoEl) {
				localVideoEl.play();
				localVideoEl.currentTime = data.currentTime;
			}
			if (isPlayingInReceivingVideoEl) {
				// isReceivingVideoPaused = false;
				receivingVideoEl.play();
				seekValueOfReceivingVideoEl = data.currentTime ?? 0;
				maxSeekValueOfReceivingVideoEl = data.duration ?? 100;
			}
		}
	}

	function onSeekOnReceivingVideo(e: any) {
		seekValueOfReceivingVideoEl = e.target.value;
		friendConnection.send({
			videoEvent: VIDEO_EVENT.PLAY_VIDEO,
			currentTime: seekValueOfReceivingVideoEl,
			duration: localVideoEl?.duration
		} as VideoEventType);
	}

	// TODO: To update time every second in `receivingVideoDevice` (person other than who is selecting the file and playing it).
	// => I tried to use `isReceivingVideoPaused` to help increment timing on receivingVideo's custom seekbar I have.

	// Doesn't work.
	// $effect(() => {
	// 	if (!isReceivingVideoPaused) {
	// 		receivingVideoTimeTicker = setTimeout(() => {
	// 			seekValueOfReceivingVideoEl = seekValueOfReceivingVideoEl + 1;
	// 		}, 1_000);
	// 	} else {
	// 		clearInterval(receivingVideoTimeTicker);
	// 	}
	// });
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
	onplay={onPlay}
	onpause={onPause}
	controls
	style={`display: ${hideLocalVideoEl ? 'none' : 'block'};`}
>
	<track kind="captions" />
</video>

<!-- Note: In below `receivingVideoElement` I am not passing `controls`, `onpause`, `onplay` attribute on purpose because we get only inconistent timings which is totally useless. -->
<video bind:this={receivingVideoEl} style={`display: ${hideReceivingVideoEl ? 'none' : 'block'};`}>
	<track kind="captions" />
</video>

<!-- TODO: make use of viedo.webkitRequestFullscreen() to go to full screen. -->

{#if !hideReceivingVideoEl}
	<input
		class="receiving-video-el-seekbar"
		type="range"
		min="0"
		max={maxSeekValueOfReceivingVideoEl}
		value={seekValueOfReceivingVideoEl}
		onchange={onSeekOnReceivingVideo}
	/>
	<p>Time: {seekValueOfReceivingVideoEl}/{maxSeekValueOfReceivingVideoEl}</p>
	<!-- Note: Please do not optimize to show play/pause in a single button because it involves much complexity as it might appear. -->
	<button class="btn" onclick={onPause}>Pause</button>
	<button class="btn" onclick={onPlay}>Play</button>
{/if}

<!-- {isReceivingVideoPaused ? 'isReceivingVideoPaused' : ' not - isReceivingVideoPaused'} -->

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
	.receiving-video-el-seekbar {
		width: 100%;
		max-width: 500px;
	}
</style>
