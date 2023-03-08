<button
    on:click={toggleModal}
>
    Settings
</button>
{#if showModal}
    <Modal
        on:close={closeModal}
    >
        <div class="settings">
            <h3>Settings</h3>
            {#each Object.entries(bindings) as [bind, action]}
                <div class="settings__item">
                    <div class="settings__item-action">{action}</div>
                    <button class="settings__item-bind" on:click={changeBind(bind, action)}>{bind}</button>
                </div>
            {/each}
            {#if actionToChange}
                <p>Waiting key for {actionToChange}</p>
            {/if}
        </div>
    </Modal>
{/if}

<script lang="ts">
    import Modal from "./modal.svelte";
    import { keyBindings } from "../stores";
    import type { KeyBindings, UserInputAction } from "../lib/types"

    let bindings: KeyBindings;
    keyBindings.subscribe(value => {
        bindings = value;
    })

    let showModal = false;
    let actionToChange: UserInputAction | null = null;

    function toggleModal() {
        showModal = !showModal;
    }

    function closeModal() {
        if (actionToChange) return;
        showModal = false;
    }

    function changeBind(bind: string, action: UserInputAction) {
        actionToChange = action;
        document.addEventListener("keypress", (e: KeyboardEvent) => {
            const newBind = e.code;
            bindings[newBind] = action;
            delete bindings[bind];
            keyBindings.update(value => value = bindings);
            actionToChange = null;
        }, {once: true})
    }
</script>

<style lang="scss">
    .settings {
        border-radius: 10px;
        padding: 20px;
        background: white;
        min-width: 300px;
    }

    .settings__item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }

</style>