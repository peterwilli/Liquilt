<svelte:options tag="liquilt-viewer" immutable={true} />

<script>
    export let render;
    let containerMain;
    let video = null;
    let videoHolder = null;
    let durSeconds = null;
    let videosReady = false;
    let lastImageIdx = null;
    let videos = [];

    import { onMount } from "svelte";

    function onPointerMove(e) {
        let width = containerMain.clientWidth;
        let mX = 0;
        if (e) {
            mX = e.layerX;
        }
        let pctX = mX / width;
        let imageIdx = Math.floor(pctX * durSeconds);
        if (lastImageIdx != imageIdx) {
            if(lastImageIdx != null) {
                videos[lastImageIdx].style.opacity = 0;
            }
            videos[imageIdx].style.opacity = 1;
            lastImageIdx = imageIdx;
        }
    }

    function initPointerMove() {
        videoHolder.addEventListener("pointermove", onPointerMove);
        onPointerMove();
    }

    function canPlay() {
        durSeconds = Math.floor(video.duration);
        video.removeEventListener("canplay", canPlay);
        videos.push(video);

        let toLoadVideos = durSeconds - 1;

        function newVideoReady(e) {
            toLoadVideos--;
            if(toLoadVideos == 0) {
                videosReady = true;
            }
            e.target.removeEventListener("seeked", newVideoReady);
        }

        for(var i = 1; i < durSeconds; i++) {
            let newVideo = document.createElement('video');
            newVideo.src = video.src;
            newVideo.currentTime = i;
            newVideo.oncontextmenu = "return false;";
            newVideo.style.opacity = 0;
            newVideo.addEventListener("seeked", newVideoReady);
            videoHolder.appendChild(newVideo);
            videos.push(newVideo);
        }
        initPointerMove();
    }

    onMount(function () {
        video.addEventListener("canplay", canPlay);
    });
</script>

<main>
    <div bind:this={containerMain} class="container">
        {#if !videosReady}
            <span>Loading...</span>
        {/if}
        <div bind:this={videoHolder} class="video-holder">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video
                style="opacity: 0"
                oncontextmenu="return false;"
                bind:this={video}
                src={render}
            />
        </div>
    </div>
</main>

<style>
    .container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
    }
    .container video {
        object-fit: contain;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .container .video-holder {
        touch-action: none;
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>
