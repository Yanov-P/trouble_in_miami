export type KeyBindings = {
    [key: string]: UserInputAction
}

export enum UserInputAction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right"
}