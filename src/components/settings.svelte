<button
    on:click={toggleModal}
>
    Settings
</button>
{#if showModal}
    <Modal
        on:close={closeModal}
    >
        settings
    </Modal>
{/if}
<script lang="ts">
    import Modal from "./modal.svelte";
    import { keyBindings } from "../stores";
    import type { KeyBindings } from "../lib/types"

    let bindings: KeyBindings
    let showModal = false;

    function toggleModal() {
        showModal = !showModal;
    }

    function closeModal() {
        console.log("settings close")
        showModal = false;
    }
</script>