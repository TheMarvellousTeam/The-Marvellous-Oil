import { set, merge } from '../util/redux'

import type { Action, State } from './type'

export const reduce = (state: State, action: Action): State => {
    if (!state.game) return state

    switch (action.type) {
        case 'game:tic':
            return set(state, ['game', 'loop', 'lastTic'], Date.now())

        case 'game:gameSpeed:set':
            return set(state, ['game', 'loop', 'gameSpeed'], action.gameSpeed)

        default:
            return state
    }
}
