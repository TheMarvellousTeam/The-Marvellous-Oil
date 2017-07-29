import type { World, DrillClass, Technology } from '../type'
import type { Action as Action_ } from '../action'

export type Action = Action_

export type Game = {
    state: 'playing',

    money: number,

    day: number,

    world: World,

    technologies: {
        available: Technology[],

        unlocked: boolean[],
    },
}

export type State = {
    appState: {},

    game: Game | null,
}
