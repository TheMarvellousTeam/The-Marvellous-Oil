import { set, merge } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    if (!state.game) return state

    switch (action.type) {
        case 'game:tic':
            return set(
                state,
                ['game', 'loop', 'nextTic'],
                state.game.loop.gameSpeed > 0
                    ? Date.now() + 1000 / state.game.loop.gameSpeed
                    : Infinity
            )

        case 'game:gameSpeed:set':
            return set(state, ['game', 'loop', 'gameSpeed'], action.gameSpeed)

        default:
            return state
    }
}
