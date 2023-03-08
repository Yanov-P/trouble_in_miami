import { UserInputAction, type KeyBindings } from "$lib/types";
import { writable } from "svelte/store";

export const keyBindings = writable({
    "KeyW": UserInputAction.Up,
    "KeyS": UserInputAction.Down,
    "KeyA": UserInputAction.Left,
    "KeyD": UserInputAction.Right,
} as KeyBindings)