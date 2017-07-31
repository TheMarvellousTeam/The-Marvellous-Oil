import type { World, Bank, DrillClass, Technology } from '../type'
import type { Action as Action_ } from '../action'

export type Action = Action_

export type Game = {
    state: 'playing',

    money: number,

    day: number,

    world: World,

    bank: Bank,

    technologies: {
        available: Technology[],

        unlocked: boolean[],
    },

    loop: {
        // lastTic date
        lastTic: 0,

        // in tic / s
        gameSpeed: 1,
    },
}

export type State = {
    appState: {},

    game: Game | null,
}
