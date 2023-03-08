<nav>
    <h1>
        Massacre in Saransk
    </h1>
    <Settings/>
</nav>
<div id="game"></div>

<script lang="ts">
    import { UserInputAction, type KeyBindings } from '$lib/types';
    import Settings from '../components/settings.svelte';


    import { onMount } from 'svelte';
    import TroubleInMiami from '../lib';
    import { keyBindings } from '../stores';

    let game: TroubleInMiami;
    
    let bindings: KeyBindings;
    
    keyBindings.subscribe((value) => {
        bindings = value;
    });

    onMount(() => {

        const gameElement = document.getElementById("game") as HTMLElement;
        game = new TroubleInMiami(gameElement);
        gameElement.addEventListener("wheel", (e: WheelEvent) => {
            game.zoom(e.deltaY / 5);
        })
        document.addEventListener("keypress", (e: KeyboardEvent) => {
            const key = bindings[e.code];
            switch (key) {
                case UserInputAction.Up:
                    game.moveUp();
                    break;
                case UserInputAction.Down:
                    game.moveDown();
                    break;
                case UserInputAction.Left:
                    game.moveLeft();
                    break;
                case UserInputAction.Right:
                    game.moveRight();
                    break;
            }
        })
    })

    
</script>

<style lang="scss" global>
    @font-face {
        font-family: alien;
        src: url('/fonts/SFAlienEncounters.ttf');
    }
    * {
        font-family: alien;
        box-sizing: border-box;
    }
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 50px;
        width: 100%;
        h1 {
            display: flex;
            margin: 0;
        }
    }

    #game {
        width: 100%;
        height: calc(100% - 50px);
        overflow: hidden;
    }
</style>