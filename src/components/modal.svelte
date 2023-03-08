<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal__wrapper"
    on:click|self={close}
>
    <slot></slot>
</div>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }
</script>

<style>
    .modal__wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>