<svelte:options tag="liquilt-viewer" immutable={true} />

<script>
    export let render,
        imageWidth = 420,
        imageHeight = 560;
    let imgMain, containerMain;
    let video = null;
    let videoHolder = null;
    let durSeconds = null;
    let neededVideoScale = 0;
    let lastImageIdx = null;

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
            video.currentTime = imageIdx;
            lastImageIdx = imageIdx;
        }
    }

    async function waitVideoToShowImage(ctx, video) {
        return new Promise((resolve, reject) => {
            let interval = setInterval(function () {
                ctx.drawImage(video, 0, 0, 1, 1);
                const pixel = ctx.getImageData(0, 0, 1, 1);
                if (pixel.data[3] > 0) {
                    resolve();
                    clearInterval(interval);
                }
            }, 100);
        });
    }

    function initPointerMove() {
        videoHolder.addEventListener("pointermove", throttle(onPointerMove, 100));
        onPointerMove();
    }

    function throttle(callback, interval) {
        let enableCall = true;
        let lastArgs = null;

        return (...args)=> {
            lastArgs = args;
            if (!enableCall) return;

            enableCall = false;
            callback.apply(this, lastArgs);
            setTimeout(() => enableCall = true, interval);
        }
    }


    function canPlay() {
        durSeconds = Math.floor(video.duration);
        video.removeEventListener("canplay", canPlay);
        onResize();
    }

    /*getNeededScale();
	Videos go slow when set to autoscale (width + height to 100%)
	This way we keep them as-is but use CSS to scale them up or down to fit the content!
	*/
    function getNeededScale() {
        const containerHeight = containerMain.clientHeight;
        const videoHeight = video.clientHeight;
        const neededScale = containerHeight / videoHeight;
        return neededScale;
    }

    function onResize() {
        neededVideoScale = getNeededScale();
    }

    onMount(async function () {
        video.addEventListener("canplay", canPlay);
        window.addEventListener("resize", onResize);
        initPointerMove();
    });
</script>

<main>
    <div bind:this={containerMain} class="container">
        {#if durSeconds == null}
            <span>Loading...</span>
        {/if}
        <div bind:this={videoHolder} class="video-holder">
            <video
                oncontextmenu="return false;"
                bind:this={video}
                style="transform: scale({neededVideoScale});"
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
        transform-origin: top center;
    }
    .container .video-holder {
        touch-action: none;
    }
</style>
