<svelte:options tag="liquilt-viewer" immutable={true} /> 
<script>
	export let render, imageWidth = 420, imageHeight = 560;
	let imgMain, containerMain;
	let blobs = null;

	import { onMount } from 'svelte';

	function onMouseMove(e) {
		let width = containerMain.clientWidth;
		let mX = 0;
		if(e) {
			mX = e.layerX;
		}
		let pctX = mX / width;
		let imageIdx = Math.floor(pctX * blobs.length);
		let image = blobs[imageIdx];
		imgMain.src = image;
	}

	async function extractFrames() {
		let video = document.createElement('video');
		video.src = render;
		video.crossOrigin = "anonymous";

		let blobs = [];
		let canvas = document.createElement('canvas');
		canvas.width = imageWidth;
		canvas.height = imageHeight;
	    let ctx = canvas.getContext('2d');

		return new Promise(function(resolve, reject) {
			let snapshot = function() {
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				canvas.toBlob(function(blob) {
					blobs.push(URL.createObjectURL(blob));
					if (video.currentTime == video.duration) {
						video.removeEventListener('canplay', snapshot);
						video.remove(); 
						resolve(blobs);
						return;
					}
					video.currentTime += 1;
				});
			};
			video.addEventListener('canplay', snapshot);
			video.currentTime = 0;
		});
	}

	function initMouseMove() {
		imgMain.addEventListener("mousemove", onMouseMove);
		onMouseMove();
	}

	onMount(async function() {
		blobs = await extractFrames();
		initMouseMove();
	});
</script>

<main>
	<div bind:this="{containerMain}" class="container">
		{#if blobs == null}
			<span>Loading...</span>
		{/if}
		<img alt="3D view" bind:this="{imgMain}" class:hidden="{blobs == null}" />
	</div>
</main>

<style>
.container {
	position: absolute;
	left: 0;
	right:0;
	top: 0;
	bottom: 0;
}
.container img {
	object-fit: contain;
	height: 100%;
	width: 100%;
}
.hidden {
	display: none
}
</style>