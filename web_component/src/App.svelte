<svelte:options tag="liquilt-viewer" immutable={true} /> 
<script>
	export let render, imageWidth = 420, imageHeight = 560;
	let imgMain, containerMain;
	let blobs = null;

	import { onMount } from 'svelte';

	function onPointerMove(e) {
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

	async function waitVideoToShowImage(ctx, video) {
		return new Promise((resolve, reject) => {
			let interval = setInterval(function() {
				ctx.drawImage(video, 0, 0, 1, 1);
				const pixel = ctx.getImageData(0, 0, 1, 1);
				console.log(pixel.data[3]);
				if(pixel.data[3] > 0) {
					resolve();
					clearInterval(interval)
				}
			}, 100);
		});
	}

	async function extractFrames() {
		let video = document.createElement('video');
		video.src = render;
		video.crossOrigin = "anonymous";
		video.style = "opacity: 0;";
		document.body.append(video);

		let blobs = [];
		let canvas = document.createElement('canvas');
		canvas.width = imageWidth;
		canvas.height = imageHeight;
	    let ctx = canvas.getContext('2d');
		await waitVideoToShowImage(ctx, video);
		return new Promise((resolve, reject) => {
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
				});
				video.currentTime += 1;
			};
			video.addEventListener('canplay', snapshot);
			video.currentTime = 0;
		});
	}

	function initPointerMove() {
		imgMain.addEventListener("pointermove", onPointerMove);
		onPointerMove();
	}

	onMount(async function() {
		blobs = await extractFrames();
		initPointerMove();
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
	touch-action: none;
}
.hidden {
	display: none
}
</style>