<nav>
    <h1>
        Trouble in Miami
    </h1>
</nav>
<div id="game"></div>

<style lang="scss">
    :global(body) {
        padding: 0;
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    nav {
        height: 50px;
        width: 100%;
        h1 {
            margin: 0;
        }
    }

    #game {
        width: 100%;
        height: calc(100% - 50px);
        overflow: hidden;
    }
</style>

<script lang="ts">

    import { onMount } from 'svelte';
    import TroubleInMiami from '../lib';

    let game: TroubleInMiami;

    onMount(() => {

        const gameElement = document.getElementById("game") as HTMLElement;
        game = new TroubleInMiami(gameElement);
        gameElement.addEventListener("wheel", (e: WheelEvent) => {
            game.zoom(e.deltaY / 5);
        })
        document.addEventListener("keypress", (e: KeyboardEvent) => {
            if (e.code === "KeyW") {
                game.moveUp();
            }
            if (e.code === "KeyS") {
                game.moveDown();
            }
            if (e.code === "KeyA") {
                game.moveLeft();
            }
            if (e.code === "KeyD") {
                game.moveRight();
            }
        })
    })

    
</script>