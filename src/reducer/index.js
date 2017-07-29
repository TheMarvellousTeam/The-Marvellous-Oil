import { chainReducer } from '../util/redux'
import { reduce as reduceGame } from './game'

import type { State } from './type'

export const defaultState: State = {
    appState: {},
    game: null,
}

export const reduce = chainReducer(reduceGame)
