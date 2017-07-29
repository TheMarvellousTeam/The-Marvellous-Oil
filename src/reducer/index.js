import { chainReducer } from '../util/redux'
import { reduce as reduceGame } from './game'
import { reduce as reduceGameLoop } from './game.loop'
import { reduce as reduceGameStart } from './game.start'

import type { State } from './type'

export const defaultState: State = {
    appState: {},
    game: null,
}

export const reduce = chainReducer(reduceGameStart, reduceGame, reduceGameLoop)
