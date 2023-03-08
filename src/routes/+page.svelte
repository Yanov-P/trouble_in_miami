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

    onMount(() => {

        const gameElement = document.getElementById("game") as HTMLElement;
        new TroubleInMiami(gameElement);
    })

    
</script>