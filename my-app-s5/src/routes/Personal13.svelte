<script lang="ts">
	// Source:
	// 1. https://whatwebcando.today/photos.html
	// 2. Claude - https://claude.ai/chat/dd2ae817-8e20-4f1b-8579-e4050b5787a5

	let SHOW_GRAB_VIDEO_BUTTON = $state(true);

	var theStream;
	function getStream() {
		// First check/request permissions
		navigator.permissions
			.query({ name: 'camera' })
			.then(function (result) {
				console.log('Camera permission:', result.state);
				if (result.state === 'denied') {
					alert('Camera access denied. Please enable camera permissions.');
					return;
				}
				// Control Flow goes from here [Tested on Poco m4]
				requestCamera();
			})
			.catch(function () {
				// Fallback if permissions API not supported
				requestCamera();
			});
	}

	function requestCamera() {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
			alert('User Media API not supported.');
			return;
		}
		var constraints = {
			// Opens front camera by default [Tested in PocoM4]
			// video: true

			// Prefers back camera, falls back to front [Tested in PocoM4]
			video: {
				facingMode: { ideal: 'environment' }
			}
		};

		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(function (stream) {
				var mediaControl = document.querySelector('video')!;
				mediaControl.srcObject = stream;
				theStream = stream;
				SHOW_GRAB_VIDEO_BUTTON = false;
			})
			.catch(function (err) {
				console.log('Error details:', err.name, err.message);
				handleCameraError(err);
			});
	}

	function handleCameraError(err) {
		alert('handleCameraError: err.name=' + err.name);
		switch (err.name) {
			case 'NotReadableError':
				alert(
					'Camera is busy or unavailable. Please close other apps using the camera and try again.'
				);
				break;
			case 'NotAllowedError':
				alert('Camera access denied. Please allow camera permissions and refresh the page.');
				break;
			case 'NotFoundError':
				alert('No camera found on this device.');
				break;
			default:
				alert('Camera error: ' + err.message);
		}
	}

	function takePhoto() {
		if (!('ImageCapture' in window)) {
			alert('ImageCapture is not available');
			return;
		}
		if (!theStream) {
			alert('Grab the video stream first!');
			return;
		}
		var theImageCapturer = new (window as any).ImageCapture(theStream.getVideoTracks()[0]) as any;
		theImageCapturer
			.takePhoto()
			.then((blob) => {
				var theImageTag = document.getElementById('imageTag') as any;
				theImageTag.src = URL.createObjectURL(blob);
			})
			.catch((err) => alert('theImageCapturer: Error: ' + err));
	}

	function stopStream() {
		if (theStream) {
			// Stop all tracks in the stream
			theStream.getTracks().forEach((track) => {
				track.stop();
			});

			// Clear the video element
			var mediaControl = document.querySelector('video')!;
			mediaControl.srcObject = null;

			// Reset the stream variable
			theStream = null;
			SHOW_GRAB_VIDEO_BUTTON = true;

			alert('Camera stopped successfully! ✅');
			// updateButtons(false);
		}
	}
</script>

{#if SHOW_GRAB_VIDEO_BUTTON}
	<p class="flex justify-end">
		<button class="border-none bg-green-400 text-white" onclick={getStream}>Grab video</button>
	</p>
{:else}
	<p class="flex justify-end">
		<button class="border-none bg-red-500 text-white" onclick={stopStream}>UnGrab video</button>
	</p>
{/if}

<!-- svelte-ignore a11y_media_has_caption -->
<p><video autoplay style="height: 180px; width: 240px;"></video></p>

<p class="flex justify-end"><button onclick={takePhoto}>Take Photo!</button></p>

<p><img id="imageTag" width="240" height="180" alt="" /></p>

<p>
	<small
		>Demo by <a href="http://www.mcasas.tk/" target="_blank" rel="noopener">Miguel Casas-Sanchez</a
		>.</small
	>
</p>

<style>
	button {
		@apply my-3 rounded-lg border border-gray-600 px-3 py-2 font-bold;
	}
</style>
