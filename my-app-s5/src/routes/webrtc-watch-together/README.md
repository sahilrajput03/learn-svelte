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
